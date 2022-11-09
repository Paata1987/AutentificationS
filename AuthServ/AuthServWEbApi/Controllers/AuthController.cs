using AuthServWEbApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AuthServWEbApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private List<Account> Accounts => new List<Account>
        {
            new Account()
            {
                Id= Guid.Parse("e2371dc9-a849-4f3c-9004-df54544sa"),
                Emaial="user@email.com",
                PasswordHasher = "user",
                Roles = new Role[] {Role.User}
            },
            new Account()
            {
                Id= Guid.Parse("e2371dc9-a849-4f3c-9004-df5g544sa"),
                Emaial="user3@email.com",
                PasswordHasher = "user",
                Roles = new Role[] {Role.User}
            },
            new Account()
            {
                Id= Guid.Parse("e2371dc9-a849-4f3c-9004-df5d544sa"),
                Emaial="user2@email.com",
                PasswordHasher = "user",
                Roles = new Role[] {Role.User}
            }
        };

        [Route("Login")]
        [HttpPost]
        public IActionResult Login([FromBody]Login request)
        {
            var user = AutenticateUser(request.Email, request.Password );

            if (user != null)
            {
                //generate jwt
            }
            return Unauthorized();
        }

        private Account AutenticateUser(string email, string password )
        {
            return Accounts.SingleOrDefault(x => x.Email == email && x.Password == password);
        }
    }
}
