using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence {
    public class DataContext : IdentityDbContext<AppUser> {
        public DataContext (DbContextOptions options) : base (options) {

        }

        public DbSet<Value> Values { get; set; }
        public DbSet<Session> Sessions { get; set; }

        public DbSet<Kid> Kids { get; set; }

        public DbSet<UserSession> UserSessions { get; set; }
        public DbSet<UserKid> UserKids { get; set; }

        protected override void OnModelCreating (ModelBuilder builder) {
            base.OnModelCreating (builder);
            builder.Entity<Value> ()
                .HasData (
                    new Value { Id = 1, Name = "Value 101" },
                    new Value { Id = 2, Name = "Value 102" },
                    new Value { Id = 3, Name = "Value 103" }

                );
            builder.Entity<UserSession> (x => x.HasKey (ua => new { ua.AppUserId, ua.SessionId }));

            builder.Entity<UserSession> ()
                .HasOne (u => u.AppUser)
                .WithMany (a => a.UserSessions)
                .HasForeignKey (u => u.AppUserId);

            builder.Entity<UserSession> ()
                .HasOne (a => a.Session)
                .WithMany (u => u.UserSessions)
                .HasForeignKey (a => a.SessionId);

            builder.Entity<UserKid> (x => x.HasKey (uk => new { uk.AppUserId, uk.KidId }));

            builder.Entity<UserKid> ()
                .HasOne (a => a.AppUser)
                .WithMany (u => u.UserKids)
                .HasForeignKey (a => a.AppUserId);

            builder.Entity<UserKid> ()
                .HasOne (k => k.Kid)
                .WithMany (k => k.UserKids)
                .HasForeignKey (k => k.KidId);

        }

    }
}