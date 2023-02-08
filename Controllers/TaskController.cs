using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using proyectreact.Models;
using Task = proyectreact.Models.Task;

namespace proyectreact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly TestContext _dbcontext;

        public TaskController(TestContext context)
        {
            _dbcontext = context;
        }


        [HttpGet]
        [Route("List")]
        public async Task<IActionResult> List()
        {
            List<Task> list = _dbcontext.Tasks.OrderByDescending(t => t.IdTask).ThenBy(t => t.RegisterDate).ToList();
            return StatusCode(StatusCodes.Status200OK, list);
        }

        [HttpPost]
        [Route("Save")]
        public async Task<IActionResult> Save([FromBody] Task request)
        {
            await _dbcontext.Tasks.AddAsync(request);
            await _dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpDelete]
        [Route("Delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            Task task = _dbcontext.Tasks.Find(id);
            _dbcontext.Tasks.Remove(task);
            await _dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
