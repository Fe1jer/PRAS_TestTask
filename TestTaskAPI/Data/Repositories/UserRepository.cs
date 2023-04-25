using TestTaskAPI.Data.Entities;
using TestTaskAPI.Data.Interfaces.Repositories;
using TestTaskAPI.Data.Repositories.Base;
using TestTaskAPI.Data.Specifications;
using TestTaskAPI.Data.Specifications.Base;

namespace TestTaskAPI.Data.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(ApplicationDbContext appDBContext) : base(appDBContext) { }

        public async Task DeleteAsync(int id)
        {
            User? user = await GetByIdAsync(id);
            if (user != null)
            {
                await DeleteAsync(user);
            }
        }

        public async Task<User?> GetByNameAsync(string username)
        {
            List<User> users = await GetAllAsync(new UsersSpecification().WhereUserName(username));

            return users.FirstOrDefault();
        }
    }
}
