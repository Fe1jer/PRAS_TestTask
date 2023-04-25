using TestTaskAPI.Data.Entities;
using TestTaskAPI.Data.Interfaces.Repositories;
using TestTaskAPI.Data.Repositories.Base;

namespace TestTaskAPI.Data.Repositories
{
    public class NewsRepository : Repository<News>, INewsRepository
    {
        public NewsRepository(ApplicationDbContext appDBContext) : base(appDBContext)
        {
        }

        public async Task DeleteAsync(int id)
        {
            News? news = await GetByIdAsync(id);
            if (news != null)
            {
                await DeleteAsync(news);
            }
        }
    }
}
