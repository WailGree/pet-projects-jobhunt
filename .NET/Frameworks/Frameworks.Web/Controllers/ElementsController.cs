using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using EFDataAccessLibrary.DataAccess;
using EFDataAccessLibrary.Models;
using Frameworks.Web.Models;

namespace Frameworks.Web.Controllers
{
    [ApiController]
    [Route("elements")]
    public class ElementsController : Controller
    {
        private readonly DataContext _db;

        public ElementsController(DataContext db)
        {
            _db = db;
        }

        public IActionResult Index()
        {
            return Ok();
        }

        [HttpGet("get-elements")]
        public string GetElements()
        {
            return JsonSerializer.Serialize(_db.Elements);
        }

        [HttpDelete("delete-element")]
        [Consumes("application/json")]
        public IActionResult DeleteElement([FromBody] DeleteElementRequest request)
        {
            if (request != null || request.Id != 0)
            {
                try
                {
                    if (_db.Elements.Any(element => element.Id == request.Id))
                    {
                        Element remElement = new Element() {Id = request.Id};
                        _db.Elements.Attach(remElement);
                        _db.Elements.Remove(remElement);
                        _db.SaveChanges();
                        return Ok($"Element with id {request.Id} removed successfully");
                    }
                    else
                    {
                        return BadRequest($"Element not found with id {request.Id}");
                    }
                }
                catch (Exception e)
                {
                    return BadRequest("Problem occurred during process: " + e);
                }
            }

            return BadRequest("Missing parameter \"id\"");
        }

        [HttpGet("load-sample-data")]
        public IActionResult LoadSample()
        {
            try
            {
                LoadSampleData();
            }
            catch (Exception e)
            {
                return BadRequest("Exception occured: " + e);
            }

            return Ok("Load successful");
        }

        private void LoadSampleData()
        {
            if (_db.Elements.Any()) return;
            var file = System.IO.File.ReadAllText("generated.json");
            var elements = JsonSerializer.Deserialize<List<Element>>(file);
            _db.AddRange(elements);
            _db.SaveChanges();
        }
    }
}