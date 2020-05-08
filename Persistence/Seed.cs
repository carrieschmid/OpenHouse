using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence {
    public class Seed {

        public static async Task SeedData (DataContext context,
            UserManager<AppUser> userManager) {
            if (!userManager.Users.Any ()) {
                var users = new List<AppUser> {
                    new AppUser {
                    Id = "a",
                    DisplayName = "Bob",
                    UserName = "bob",
                    Email = "bob@test.com"
                    },
                    new AppUser {
                    Id = "b",
                    DisplayName = "Jane",
                    UserName = "jane",
                    Email = "jane@test.com"
                    },
                    new AppUser {
                    Id = "c",
                    DisplayName = "Tom",
                    UserName = "tom",
                    Email = "tom@test.com"
                    },
                };

                foreach (var user in users) {
                    await userManager.CreateAsync (user, "Pa$$w0rd");
                }
            }

            if (!context.Kids.Any ()) {
                var kids = new List<Kid> {
                    new Kid {
                    Name = "Bobby",
                    Age = "10",
                    Interests = "Swimming",
                    WorkingOn = "Math"
                    },
                    new Kid {
                    Name = "Jenny",
                    Age = "10",
                    Interests = "Legos",
                    WorkingOn = "Writing"
                    },
                    new Kid {
                    Name = "Sam",
                    Age = "8",
                    Interests = "Science",
                    WorkingOn = "Physical Activity"
                    }

                };
                context.Kids.AddRange (kids);
                context.SaveChanges ();

            }

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
                    Activity1 = "Paint",
                    Activity2 = "Paint"

                    },
                    new Session {
                    Title = "Future Activity 1",
                    Date = DateTime.Now.AddMonths (1),
                    Timeblock = "9am - 5pm",
                    Description = "Language arts activity",
                    Category = "Language",
                    Address = "1503 NE Schuyler St",
                    City = "Portland",
                    Activity1 = "Paint",
                    Activity2 = "Paint"

                    },
                    new Session {
                    Title = "Future Activity 2",
                    Date = DateTime.Now.AddMonths (2),
                    Timeblock = "9am - 1m",
                    Description = "Session 1 months ago",
                    Category = "Science",
                    Address = "2915 NE Jarrett St.",
                    City = "Portland",
                    Activity1 = "Paint",
                    Activity2 = "Paint"

                    },
                    new Session {
                    Title = "Future Activity 3",
                    Date = DateTime.Now.AddMonths (3),
                    Timeblock = "1pm - 5pm",
                    Description = "Baking pies",
                    Category = "Craft",
                    Address = "1503 NE Schuyler St",
                    City = "Portland",
                    Activity1 = "Paint",
                    Activity2 = "Paint"

                    },
                    new Session {
                    Title = "Future Activity 4",
                    Date = DateTime.Now.AddMonths (4),
                    Timeblock = "1pm - 5pm",
                    Description = "Baking pies",
                    Category = "Craft",
                    Address = "1503 NE Schuyler St",
                    City = "Portland",
                    Activity1 = "Paint",
                    Activity2 = "Paint"

                    }

                };

                context.Sessions.AddRange (sessions);
                context.SaveChanges ();
                //this is probably where the delete data methods would go
                // var context = new SampleContext ();
                // var author = new Author { AuthorId = 1 };
                // context.Entry (author).State = EntityState.Deleted;
                // context.SaveChanges ();
            }
        }
    }
}