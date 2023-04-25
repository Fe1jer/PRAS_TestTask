namespace TestTaskAPI.Data.Interfaces.Repositories;

using TestTaskAPI.Data.Entities;
using TestTaskAPI.Data.Interfaces;

public interface INewsRepository
{
    Task<News?> GetByIdAsync(int newsId);
    Task<List<News>> GetAllAsync();
    Task<List<News>> GetAllAsync(ISpecification<News> specification);
    Task AddAsync(News news);
    Task UpdateAsync(News news);
    Task DeleteAsync(int id);
}
