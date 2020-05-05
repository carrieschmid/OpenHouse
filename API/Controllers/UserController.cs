using System.Threading.Tasks;
using Application.User;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers {

    public class UserController : BaseController {
        [AllowAnonymous]
        [HttpPost ("login")]
        public async Task<ActionResult<User>> Login (Login.Query query) {
            return await Mediator.Send (query);

        }

        [AllowAnonymous]
        [HttpPost ("register")]
        public async Task<ActionResult<User>> Register (Register.Command command) {
            return await Mediator.Send (command);
        }

        //User has been changed to AppUser from original code

        [HttpGet]
        public async Task<ActionResult<User>> CurrentUser () {
            return await Mediator.Send (new CurrentUser.Query ());
        }

        //User has been changed to AppUser from original code
    }
}