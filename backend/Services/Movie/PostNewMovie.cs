using backend.DBContext;
using backend.Models.Movie;
using backend.Models.Response;
using backend.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Movie
{
    public class PostNewMovie
    {
        private readonly MovieCatalogContext _context;
        private readonly LogManager _logger;
        private readonly HttpContextUtils _httpUtils;

        public PostNewMovie(
            MovieCatalogContext context,
            LogManager logger,
            HttpContextUtils httpUtils)
        {
            _context = context;
            _logger = logger;
            _httpUtils = httpUtils;
        }

        public async Task<IActionResult> NewMovie(HttpContext httpContext)
        {
            GeneralResponse<Entities.Movie> response = new();
            try
            {
                _logger.LogStart(httpContext);

                Entities.Movie newMovie = await _httpUtils.GetBodyRequest<Entities.Movie>(httpContext);
                _logger.LogObjectInformation(httpContext, newMovie);
                if (newMovie is null)
                {
                    _logger.LogInformation(httpContext, "Invalid movie data");
                    response = new()
                    {
                        StatusCode = 400,
                        Message = "Invalid movie data",
                        Object = null
                    };
                    return new OkObjectResult(response);
                }

                await _context.Movies.AddAsync(newMovie);
                await _context.SaveChangesAsync();

                response = new()
                {
                    StatusCode = 201,
                    Message = "Movie created",
                    Object = newMovie
                };

                return new OkObjectResult(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(httpContext, ex.Message);
                response = new()
                {
                    StatusCode = 500,
                    Message = $"TraceId: {httpContext.TraceIdentifier}\nAn error occurred while creating movie",
                    Object = null
                };
                return new OkObjectResult(response);
            }
            finally
            {
                _logger.LogEnd(httpContext);
            }
        }
    }
}
