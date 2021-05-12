using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EFDataAccessLibrary.DataAccess;

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
    }
}
