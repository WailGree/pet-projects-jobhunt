using System.ComponentModel.DataAnnotations;

namespace Frameworks.Web.Models
{
    public class Element
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(256)]
        public string Name { get; set; }
        [MaxLength(1024)]
        public string Description { get; set; }
    }
}
