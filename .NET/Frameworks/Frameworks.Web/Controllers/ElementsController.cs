using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using EFDataAccessLibrary.DataAccess;
using EFDataAccessLibrary.Models;

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
            LoadSampleData();
        }

        private void LoadSampleData()
        {
            if (_db.Elements.Any()) return;
            var file = System.IO.File.ReadAllText("generated.json");
            var elements = JsonSerializer.Deserialize<List<Element>>(file);
            _db.AddRange(elements);
            _db.SaveChanges();
        }

        public IActionResult Index()
        {
            return Ok();
        }
    }
}