using System.ComponentModel.DataAnnotations;

namespace Frameworks.Web.Models
{
    public class Element
    {
        [Key] [Required] public int Id { get; set; }
        [MaxLength(256)] [Required] public string Name { get; set; }
        [MaxLength(1024)] [Required] public string Description { get; set; }
    }
}