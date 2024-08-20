using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using Newtonsoft.Json;


public class ApplicationUser : IdentityUser<Guid>
{
    public Guid Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; } // Store hashed passwords
    public string Password { get; set; } // Store hashed passwords
}
