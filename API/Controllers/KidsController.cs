using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Kids;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers {

    public class KidsController : BaseController {

        [HttpGet]
        public async Task<ActionResult<List<KidDto>>> List () {
            return await Mediator.Send (new List.Query ());
        }

        [HttpGet ("{id}")]
        [Authorize]
        public async Task<ActionResult<Kid>> Details (Guid id) {
            return await Mediator.Send (new Details.Query { Id = id });
        }

        //this should be api/kids
        [HttpPost]
        public async Task<ActionResult<Unit>> Create (Create.Command command) {
            return await Mediator.Send (command);
        }

        [HttpPut ("{id}")]
        public async Task<ActionResult<Unit>> Edit (Guid id, Edit.Command command) {
            command.Id = id;
            return await Mediator.Send (command);
        }

        [HttpDelete ("{id}")]
        public async Task<ActionResult<Unit>> Delete (Guid id) {
            return await Mediator.Send (new Delete.Command { Id = id });
        }

        // [HttpPost ("{id}/attend")]
        // public async Task<ActionResult<Unit>> Parent (Guid id) {
        //     return await Mediator.Send (new Parent.Command { Id = id });
        // }

        // [HttpDelete ("{id}/attend")]
        // public async Task<ActionResult<Unit>> Unattend (Guid id) {
        //     return await Mediator.Send (new Unattend.Command { Id = id });
        // }

    }
}