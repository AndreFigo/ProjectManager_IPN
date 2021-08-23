using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TaskManager.Data;
using TaskManager.Data.Entities;
using TaskManager.ViewModels;

namespace TaskManager.Controllers
{
    [Route("[Controller]")]
    [ApiController]

    public class AccountController : Controller
    {
        private readonly SignInManager<Worker> signInManager;
        private readonly UserManager<Worker> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration config;

        public AccountController(SignInManager<Worker> signInManager, UserManager<Worker> userManager,RoleManager<IdentityRole> roleManager,
            IConfiguration config)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.config = config;

        }

        

        [Route("register")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var newRole = await roleManager.FindByNameAsync(model.RoleName);
                if (newRole == null)
                {
                    return BadRequest("Role not supported");
                    //newRole = new IdentityRole
                    //{
                    //    Name = model.RoleName
                    //};
                    //var res = await roleManager.CreateAsync(newRole);
                    //if (res == null)
                    //{
                    //    return BadRequest("Could not create new role");
                    //}
                }
                var newWorker = new Worker
                {
                    UserName = model.Username,
                    FirstName= model.FirstName,
                    LastName= model.LastName,
                    //Role = newRole,
                    Email = model.Email
                };
                var result = await userManager.CreateAsync(newWorker, model.Password);
                await userManager.AddToRoleAsync(newWorker, model.RoleName);
                if (result == IdentityResult.Success)
                    return Ok("New user registered");
            }
            return BadRequest("Failed to create user");
        }

        [Route("createToken")]
        [HttpPost]
        public async Task<IActionResult> CreateToken([FromBody] LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await this.userManager.FindByNameAsync(model.Username);

                if (user != null)
                {
                    var result = await this.signInManager.CheckPasswordSignInAsync(user, model.Password, false);
                    if (result.Succeeded)
                    {
                        //create the token
                        var claims = new[]
                        {
                            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),

                            new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)
                        };

                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.config["Tokens:Key"]));
                        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                        var token = new JwtSecurityToken(this.config["Tokens:Issuer"], this.config["Tokens:Audience"], claims, signingCredentials: creds, expires: DateTime.UtcNow.AddMinutes(60));
                        
                        var roles = await userManager.GetRolesAsync(user);

                        return Created("", new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(token),
                            expiration = token.ValidTo,
                            role= roles[0]
                        });
                    }
                }
            }

            return BadRequest();
        }
    }
}
