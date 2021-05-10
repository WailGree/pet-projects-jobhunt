using Frameworks.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace RemailCore.Library.DataAccess
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) { }
        public DbSet<Element> Elements { get; set; }
    }
}