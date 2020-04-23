using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase {
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get () {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet ("{id}")]
        //once we hit the value (5) it is available in the parameter of our method, we'll return a single string called "value"
        public ActionResult<string> Get (int id) {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post ([FromBody] string value) { }

        // PUT api/values/5
        [HttpPut ("{id}")]
        public void Put (int id, [FromBody] string value) { }

        // DELETE api/values/5
        [HttpDelete ("{id}")]
        public void Delete (int id) { }
    }
}