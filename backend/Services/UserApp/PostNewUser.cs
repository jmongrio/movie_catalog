﻿using backend.DBContext;
using backend.Entities;
using backend.Models.Response;
using backend.Utils;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services.UserApp
{
    public class PostNewUser
    {
        private readonly MovieCatalogContext _context;
        private readonly LogManager _logger;
        private readonly HttpContextUtils _httpUtils;
        private readonly Security _security;

        public PostNewUser(
            MovieCatalogContext context,
            LogManager logger,
            HttpContextUtils httpUtils,
            Security security)
        {
            _context = context;
            _logger = logger;
            _httpUtils = httpUtils;
            _security = security;
        }

        public async Task<IActionResult> NewUser(HttpContext httpContext)
        {
            GeneralResponse<User> response = new();
            try
            {
                _logger.LogStart(httpContext);

                User user = await _httpUtils.GetBodyRequest<User>(httpContext);
                user.Password = _security.HashPassword(user.Password!);
                _logger.LogObjectInformation(httpContext, user);

                if (user is null)
                {
                    _logger.LogInformation(httpContext, "Invalid user data");
                    response = new()
                    {
                        StatusCode = 400,
                        Message = "Invalid user data",
                        Object = null
                    };
                }

                await _context.Users.AddAsync(user!);
                await _context.SaveChangesAsync();
                _logger.LogInformation(httpContext, "User created successfully");

                response = new()
                {
                    StatusCode = 201,
                    Message = "User created successfully",
                    Object = user
                };
                return new OkObjectResult(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(httpContext, ex.Message);
                response = new()
                {
                    StatusCode = 500,
                    Message = $"TraceId: {httpContext.TraceIdentifier} \nAn error occurred while creating user",
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