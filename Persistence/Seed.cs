using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
// using Microsoft.AspNetCore.Identity;

namespace Persistence {
    public class Seed {
        public static async Task SeedData (DataContext context) {

            if (!context.Sessions.Any ()) {
                var sessions = new List<Session> {
                    new Session {
                    Title = "Past Session 1",
                    Date = DateTime.Now.AddMonths (-2),
                    Timeblock = "9am - 1pm",
                    Description = "Session 2 months ago",
                    Category = "Math",
                    Address = "2915 NE Jarrett St",
                    City = "Portland",
                    },
                    new Session {
                    Title = "Past Activity 2",
                    Date = DateTime.Now.AddMonths (-1),
                    Timeblock = "1pm - 5pm",
                    Description = "Session 1 months ago",
                    Category = "Art",
                    Address = "1503 NE Schuyler St",
                    City = "Portland",
                    },
                    new Session {
                    Title = "Future Activity 1",
                    Date = DateTime.Now.AddMonths (1),
                    Timeblock = "9am - 5pm",
                    Description = "Language arts activity",
                    Category = "Language",
                    Address = "1503 NE Schuyler St",
                    City = "Portland",

                    },
                    new Session {
                    Title = "Future Activity 2",
                    Date = DateTime.Now.AddMonths (2),
                    Timeblock = "9am - 1m",
                    Description = "Session 1 months ago",
                    Category = "Science",
                    Address = "2915 NE Jarrett St.",
                    City = "Portland",

                    },
                    new Session {
                    Title = "Future Activity 3",
                    Date = DateTime.Now.AddMonths (3),
                    Timeblock = "1pm - 5pm",
                    Description = "Baking pies",
                    Category = "Craft",
                    Address = "1503 NE Schuyler St",
                    City = "Portland",

                    },
                    new Session {
                    Title = "Future Activity 4",
                    Date = DateTime.Now.AddMonths (4),
                    Timeblock = "1pm - 5pm",
                    Description = "Baking pies",
                    Category = "Craft",
                    Address = "1503 NE Schuyler St",
                    City = "Portland",

                    }
                };

                context.Sessions.AddRange (sessions);
                context.SaveChanges ();
            }
        }
    }
}