using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;
using XLSolutions.Core;

namespace XLSolutions.Data
{

    public class XLSolutionsDbContext : DbContext
    {
        public XLSolutionsDbContext(DbContextOptions<XLSolutionsDbContext> options) : base(options)
        {
 
        }

        public DbSet<Phone> Phone { get; set; }
        public DbSet<Client> Client { get; set; }

    }
}
