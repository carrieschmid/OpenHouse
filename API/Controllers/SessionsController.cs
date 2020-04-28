using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Sessions;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class SessionsController : ControllerBase {
        private readonly IMediator _mediator;
        public SessionsController (IMediator mediator) {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Session>>> List () {
            return await _mediator.Send (new List.Query ());
        }

    }
}