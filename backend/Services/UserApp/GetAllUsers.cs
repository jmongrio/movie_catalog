using backend.DBContext;
using backend.Models.ENUM;
using backend.Models.Response;
using backend.Models.UserApp;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.UserApp
{
    public class GetAllUsers
    {
        private readonly MovieCatalogContext _context;
        public GetAllUsers(
            MovieCatalogContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> GetUsers()
        {
            GeneralResponse<List<UserModel>> response = new();
            try
            {
                List<UserModel> users =
                await _context.Users.Where(x =>
                                                x.Status.Equals(ENTITY_STATUS.ACTIVE))
                                    .Include(x => x.IdRolNavigation)
                                    .Select(x => new UserModel
                                    {
                                        Id = x.Id,
                                        FirstName = x.FirstName,
                                        LastName = x.LastName,
                                        Email = x.Email,
                                        Rol = x.IdRolNavigation!.Name
                                    })
                                    .ToListAsync();

                if (users is null)
                {
                    response = new()
                    {
                        StatusCode = 400,
                        Message = "Users not found",
                        Object = null
                    };
                    return new OkObjectResult(response);
                }

                response = new()
                {
                    StatusCode = 200,
                    Message = "Users found",
                    Object = users
                };
                return new OkObjectResult(response);
            }
            catch (Exception error)
            {
                response = new()
                {
                    StatusCode = 500,
                    Message = error.Message,
                    Object = null
                };

                return new ObjectResult(response);
            }
        }
    }
}
