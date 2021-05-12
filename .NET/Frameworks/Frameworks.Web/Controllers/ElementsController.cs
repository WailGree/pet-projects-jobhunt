using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Frameworks.Web.Controllers
{
    public class ElementsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
