using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestTaskAPI.Data.Entities;
using TestTaskAPI.Data.Interfaces.Repositories;
using TestTaskAPI.Data.Interfaces.Services;
using TestTaskAPI.Data.Specifications;
using TestTaskAPI.ViewModels;

namespace TestTaskAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsApiController : ControllerBase
    {
        private readonly ILogger<NewsApiController> _logger;
        private readonly INewsRepository _newsRepository;

        public NewsApiController(ILogger<NewsApiController> logger, INewsRepository newsRepository)
        {
            _logger = logger;
            _newsRepository = newsRepository;
        }

        // GET: api/NewsApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<News>>> GetNews(int page, int pageLimit)
        {
            List<News> news = await _newsRepository.GetAllAsync(new NewsSpecification().AddOrderingByRelevance().AddPagination(pageLimit, page));

            return news;
        }

        // GET: api/NewsApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<News>> GetNews(int id)
        {
            News? news = await _newsRepository.GetByIdAsync(id);

            if (news == null)
            {
                return NotFound();
            }

            return news;
        }

        // PUT: api/NewsApi/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutNews(int id, [FromForm] CreateChangeNewsVM model)
        {
            if (id != model.News.Id)
            {
                return BadRequest();
            }
            try
            {
                News news = model.News;
                string path = "\\img\\News\\";
                path += model.Img != null ? news.Title.Replace(" ", "_") + "\\" : "Default.jpg";
                //Saving the uploaded image on the server and deleting the strictly image
                if (model.Img != null && news.Img != "\\img\\News\\Default.jpg")
                {
                    string[] deletePath = news.Img.Split('.');
                    IFileService.DeleteFile(news.Img);
                    news.Img = deletePath[0] + "_300x170." + deletePath[1];
                    IFileService.DeleteFile(news.Img);
                    news.Img = IFileService.UploadFile(model.Img, path + model.Img.FileName);
                    IFileService.ResizeAndCrop(news.Img, 300, 170);
                }//Saving the uploaded image on the server if it was before "Default"
                else if (model.Img != null)
                {
                    news.Img = IFileService.UploadFile(model.Img, path + model.Img.FileName);
                    IFileService.ResizeAndCrop(news.Img, 300, 170);
                }

                await _newsRepository.UpdateAsync(news);
                _logger.LogInformation("Изменёна новость - {NewsTitle}", model.News.Title);

                return Ok();
            }
            catch (IOException)
            {
                ModelState.AddModelError("modelErrors", "В данный момент невозможно изменить изображение");
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await NewsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch
            {
                _logger.LogError("Произошла ошибка при изменении новости - {NewsTitle}", model.News.Title);
            }

            return BadRequest(ModelState);
        }

        // POST: api/NewsApi
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<News>> PostNews([FromForm] CreateChangeNewsVM model)
        {
            if (!_newsRepository.GetAllAsync().Result.Any())
            {
                return Problem("Entity set 'ApplicationDbContext.News'  is null.");
            }
            try
            {
                string path = "\\img\\News\\";
                path += model.Img != null ? model.News.Title.Replace(" ", "_") + "\\" : "Default.jpg";

                model.News.Img = model.Img != null ? IFileService.UploadFile(model.Img, path + model.Img.FileName) : path;
                Task addingNews = _newsRepository.AddAsync(model.News);
                if (model.Img != null)
                {
                    IFileService.ResizeAndCrop(model.News.Img, 300, 170);
                }

                await addingNews;
                _logger.LogInformation("Создана новость - {NewsTitle}", model.News.Title);

                return Ok();
            }
            catch
            {
                _logger.LogError("Произошла ошибка при создании новости");
            }
            return BadRequest(ModelState);
        }

        // DELETE: api/NewsApi/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteNews(int id)
        {
            if (!_newsRepository.GetAllAsync().Result.Any())
            {
                return NotFound();
            }
            var news = await _newsRepository.GetByIdAsync(id);
            if (news == null)
            {
                return NotFound();
            }

            await _newsRepository.DeleteAsync(id);

            return Ok();
        }

        private async Task<bool> NewsExists(int id)
        {
            var spec = await _newsRepository.GetAllAsync();
            return spec.Any(e => e.Id == id);
        }
    }
}
