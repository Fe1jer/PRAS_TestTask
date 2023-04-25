using System.ComponentModel.DataAnnotations;
using TestTaskAPI.Data.Entities;

namespace TestTaskAPI.ViewModels
{
    public class CreateChangeNewsVM
    {
        public CreateChangeNewsVM() { }
        public CreateChangeNewsVM(News news)
        {
            News = news;
        }

        public News News { get; set; } = new();

        [Display(Name = "Изображение")]
        public IFormFile? Img { get; set; }
    }
}
