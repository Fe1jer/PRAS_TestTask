using System.ComponentModel.DataAnnotations;

namespace TestTaskAPI.ViewModels
{
    public class LoginVM
    {
        [Required(ErrorMessage = "Не указан Email")]
        [DataType(DataType.EmailAddress)]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "Длина пароля не менее 6 символов")]
        [DataType(DataType.Password)]
        [StringLength(25, MinimumLength = 6)]
        public string Password { get; set; } = string.Empty;

        [Display(Name = "Запомнить?")]
        public bool RememberMe { get; set; }
    }
}
