﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
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
        public IEnumerable<Element> GetElements()
        {
            return _db.Elements;
        }

        [HttpPost("get-element")]
        [Consumes("application/json")]
        public Element GetElement([FromBody] ElementIdOnlyRequest idOnlyRequest)
        {
            if (idOnlyRequest == null || idOnlyRequest.Id == 0)
                return null;

            Element element = _db.Elements.FirstOrDefault(fodElement => fodElement.Id == idOnlyRequest.Id);
            return element;
        }

        [HttpPut("add-element")]
        [Consumes("application/json")]
        public IActionResult AddElement([FromBody] AddElementRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Name) || string.IsNullOrEmpty(request.Description))
                return BadRequest("The request's body is either missing elements or is completely empty.");
            try
            {
                Element element = new Element {Name = request.Name, Description = request.Description};
                _db.Add(element);
                _db.SaveChanges();
                return Ok("Element added successfully");
            }
            catch (Exception e)
            {
                return BadRequest("Problem occurred during process: " + e);
            }
        }

        [HttpDelete("delete-element")]
        [Consumes("application/json")]
        public IActionResult DeleteElement([FromBody] ElementIdOnlyRequest idOnlyRequest)
        {
            if (idOnlyRequest == null || idOnlyRequest.Id == 0) return BadRequest("Missing parameter \"id\"");
            try
            {
                if (_db.Elements.Any(element => element.Id == idOnlyRequest.Id))
                {
                    Element remElement = new Element {Id = idOnlyRequest.Id};
                    _db.Elements.Attach(remElement);
                    _db.Elements.Remove(remElement);
                    _db.SaveChanges();
                    return Ok($"Element with id {idOnlyRequest.Id} removed successfully");
                }
                else
                {
                    return BadRequest($"Element not found with id {idOnlyRequest.Id}");
                }
            }
            catch (Exception e)
            {
                return BadRequest("Problem occurred during process: " + e);
            }
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