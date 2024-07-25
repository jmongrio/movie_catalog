using backend.Services.Movie;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        [AllowAnonymous]
        [HttpGet]
        async public Task<IActionResult> GetAllMovies([FromServices] GetAllMovies service) => await service.GetAll(HttpContext);

        [HttpGet("id")]
        async public Task<IActionResult> GetById([FromServices] GetMovieById service) => await service.GetById(HttpContext);

        [HttpPost]
        async public Task<IActionResult> Create([FromServices] PostNewMovie service) => await service.NewMovie(HttpContext);

        [HttpPut]
        async public Task<IActionResult> Update([FromServices] PutMovie service) => await service.EditMovie(HttpContext);
    }
}
