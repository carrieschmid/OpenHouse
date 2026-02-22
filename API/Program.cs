using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API {
    public class Program {
        public static void Main (string[] args) {

            var host = CreateHostBuilder (args).Build ();
            using (var scope = host.Services.CreateScope ()) {
                var services = scope.ServiceProvider;
                try {
                    var context = services.GetRequiredService<DataContext> ();
                    // Drop __EFMigrationsHistory left behind by failed migration attempts
                    // so EnsureCreated() can build the schema fresh from the model
                    context.Database.ExecuteSqlRaw ("DROP TABLE IF EXISTS \"__EFMigrationsHistory\"");
                    Console.WriteLine ("Calling EnsureCreated()...");
                    var created = context.Database.EnsureCreated ();
                    Console.WriteLine ($"EnsureCreated() result: {created}");
                    var userManager = services.GetRequiredService<UserManager<AppUser>> ();
                    Seed.SeedData (context, userManager).Wait ();

                } catch (Exception ex) {
                    Console.Error.WriteLine ($"STARTUP ERROR: {ex.GetType ().Name}: {ex.Message}");
                    Console.Error.WriteLine (ex.StackTrace);
                    var logger = services.GetRequiredService<ILogger<Program>> ();
                    logger.LogError (ex, "An error occured during migration.");
                }
            }
            host.Run ();
        }

        public static IHostBuilder CreateHostBuilder (string[] args) =>
            Host.CreateDefaultBuilder (args)
            .ConfigureWebHostDefaults (webBuilder => {
                webBuilder.UseStartup<Startup> ();
            });
    }
}