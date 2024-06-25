﻿using backend.Services.UserApp;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetUsers([FromServices] GetAllUsers service) => await service.GetUsers(HttpContext);

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById([FromServices] GetUserById service) => await service.GetById(HttpContext);

        [HttpPost]
        public async Task<IActionResult> PostNewUser([FromServices] PostNewUser service) => await service.NewUser(HttpContext);
    }
}
