﻿namespace TestTaskAPI.Models
{
    public class TokenResponse
    {
        public string JWTToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
    }
}
