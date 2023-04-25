namespace TestTaskAPI.Data.Entities;

using TestTaskAPI.Data.Entities.Base;
using System.Text.Json.Serialization;

public class User : Entity
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;

    [JsonIgnore]
    public string Password { get; set; } = string.Empty;
}