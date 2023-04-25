using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using TestTaskAPI.Data.Entities;

namespace TestTaskAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<News> News { get; set; }
        public DbSet<User> Users { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
            News = Set<News>();
            Users = Set<User>();
        }
    }
}