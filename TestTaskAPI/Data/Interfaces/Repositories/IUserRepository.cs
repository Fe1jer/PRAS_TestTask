using TestTaskAPI.Data.Entities;

namespace TestTaskAPI.Data.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetByIdAsync(int userId);
        Task<User?> GetByNameAsync(string username);
        Task<List<User>> GetAllAsync();
        Task<List<User>> GetAllAsync(ISpecification<User> specification);
        Task AddAsync(User user);
        Task UpdateAsync(User user);
        Task DeleteAsync(int id);
    }
}
