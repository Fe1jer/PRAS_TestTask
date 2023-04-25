using TestTaskAPI.Data.Entities;
using TestTaskAPI.ViewModels;

namespace TestTaskAPI.Data.Interfaces.Services
{
    public interface IUserService
    {
        Task<object?> Authenticate(LoginVM model);
    }
}
