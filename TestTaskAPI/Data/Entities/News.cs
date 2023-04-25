namespace TestTaskAPI.Data.Entities;

using System.ComponentModel.DataAnnotations;
using TestTaskAPI.Data.Entities.Base;

public class News : Entity
{
    [DataType(DataType.Text)]
    [Required(ErrorMessage = "Введите заголовок")]
    public string Title { get; set; } = String.Empty;

    [DataType(DataType.Text)]
    [Required(ErrorMessage = "Введите подзаголовок")]
    public string SubTitle { get; set; } = String.Empty;

    [DataType(DataType.ImageUrl)]
    public string Img { get; set; } = "\\img\\News\\Default.jpg";

    [DataType(DataType.Text)]
    [Required(ErrorMessage = "Введите название")]
    public string Text { get; set; } = String.Empty;
}
