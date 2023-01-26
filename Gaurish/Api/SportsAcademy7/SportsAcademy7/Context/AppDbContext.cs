using SportsAcademy7.Models;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Linq;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;



namespace SportsAcademy7.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Member> Members { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Member>()
                .Property(x => x.CreatedAt)
                .HasDefaultValueSql("now()");

            modelBuilder.Entity<Member>()
                .Property(x => x.UpdatedAt)
                .HasDefaultValueSql("now()");
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            var entries = ChangeTracker
                .Entries()
                .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Property("CreatedAt").CurrentValue = DateTime.Now;
                }
                entry.Property("UpdatedAt").CurrentValue = DateTime.Now;
            }

            return base.SaveChanges(acceptAllChangesOnSuccess);
        }
    }
}