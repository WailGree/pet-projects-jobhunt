using System.ComponentModel.DataAnnotations;

namespace EFDataAccessLibrary.Models
{
    public class Element
    {
        [Key] public int Id { get; set; }
        [MaxLength(128)] [Required] public string Name { get; set; }
        [MaxLength(1024)] [Required] public string Description { get; set; }
    }
}