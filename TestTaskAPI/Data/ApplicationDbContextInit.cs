using Microsoft.EntityFrameworkCore;
using TestTaskAPI.Data.Entities;

namespace TestTaskAPI.Data
{
    public class ApplicationDbContextInit
    {//initializing empty database tables
        public async static Task InitDbContextAsync(ApplicationDbContext context)
        {
            /*context.Database.EnsureDeleted(); //Delete database
            context.Database.EnsureCreated(); //Create database, if it does not exist on the computer*/
            if (!await context.Users.AnyAsync())
            {//Creating users, if they do not exist
                CreateUsers(context);
            }
            if (!await context.News.AnyAsync())
            {//Create туцы, if they do not exist
                CreateNews(context);
            }
        }

        private static void CreateNews(ApplicationDbContext context)
        {
            News news = new()
            {
                Title = "Test title",
                SubTitle = "Test subtitle for the test task",
                Text = "This is a news test page to test the news description page. \"Title\", \"Image\", \"Subtitle\" and \"Text\" must be present here"
            };

            context.News.Add(news);
            context.SaveChanges();
        }

        private static void CreateUsers(ApplicationDbContext context)
        {
            CreateUser("test", "test", "test", "AFqlzFl1YOw/s2y9ypzqzfwIrexnwAgUh6gPrXHYIuFNgZdde/41b91uKyJlXAGRUg==", context);
        }

        private static void CreateUser(string name, string firstName, string lastName, string password, ApplicationDbContext context)
        {
            User user = new() { Username = name, FirstName = firstName, LastName = lastName, Password = password };
            context.Users.Add(user);
            context.SaveChanges();
        }
    }
}
