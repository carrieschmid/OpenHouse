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
                    WorkingOn = "Math",
                    UserKids = new List<UserKid> {
                    new UserKid {
                    AppUserId = "a",
                    },
                    },
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
                    Title = "Inside Out Fun",
                    Date = DateTime.Now.AddMonths (-2),
                    Timeblock = "9am - 1pm",
                    Description = "Sidewalk paint, sculpture soap, crea a climb-through greeting card and more.",
                    Category = "Arts and Crafts",
                    Address = "2915 NE Jarrett St",
                    City = "Portland",
                    Activity1 = "Sidewalk Painting: Mix baking soda, cornstarch, and warm (nearly hot) water in a container. Add water until you get to the desired consistency. Add food coloring.After the painting is done, put vinegar into the spray bottle and spray the paint. It will foam and fizzle like magic! Paint may be stored in a sealed container.",
                    UserSessions = new List<UserSession> {
                    new UserSession {
                    AppUserId = "b",
                    IsHost = true,
                    DateJoined = DateTime.Now.AddMonths (2)
                    },
                    }
                    },
                    new Session {
                    Title = "The Moon",
                    Date = DateTime.Now.AddMonths (-1),
                    Timeblock = "1pm - 5pm",
                    Description = "Learn about the phases of the moon with stories and art.",
                    Category = "Science",
                    Address = "1503 NE Schuyler St",
                    City = "Portland",
                    Activity2 = "Moon story, moon crater art project, video about moon phases, make moon sand",
                    UserSessions = new List<UserSession> {
                    new UserSession {
                    AppUserId = "a",
                    IsHost = true,
                    DateJoined = DateTime.Now.AddMonths (2)
                    },
                    },
                    },
                    new Session {
                    Title = "Write a Screenplay",
                    Date = DateTime.Now.AddMonths (1),
                    Timeblock = "9am - 5pm",
                    Description = "Learn about the parts of a screenplay, write it and create a short movie.",
                    Category = "Language",
                    Address = "1544 NE 34th St",
                    City = "Portland",
                    Activity1 = "Choose a story to turn into a screenplay. Describe how to write a scene. Write them in pairs.",
                    Activity2 = "Learn about 'the montage' and 'the intercut'. Film the scenes ",
                    UserSessions = new List<UserSession> {
                    new UserSession {
                    AppUserId = "c",
                    IsHost = true,
                    DateJoined = DateTime.Now.AddMonths (2)
                    },
                    },
                    },
                    new Session {
                    Title = "Budgeting 101",
                    Date = DateTime.Now.AddMonths (2),
                    Timeblock = "9am - 1m",
                    Description = "Learn the value of a quarter, nickle and dime. Set up a store and learn to spend your money wisely.",
                    Category = "Math",
                    Address = "2915 NE Jarrett St.",
                    City = "Portland",
                    Activity1 = "Count the coins, store set up, shopping activity.",
                    UserSessions = new List<UserSession> {
                    new UserSession {
                    AppUserId = "b",
                    IsHost = true,
                    DateJoined = DateTime.Now.AddMonths (2)
                    },
                    },

                    },
                    new Session {
                    Title = "Forest Park Hike",
                    Date = DateTime.Now.AddMonths (3),
                    Timeblock = "9am - 5pm",
                    Description = "Explore the beauty of our urban forest.",
                    Category = "Nature",
                    Address = "1503 NE Schuyler St",
                    City = "Portland",
                    Activity1 = "Learn about urban forestry.",
                    Activity2 = "Go for a hike."
                    UserSessions = new List<UserSession> {
                    new UserSession {
                    AppUserId = "b",
                    IsHost = true,
                    DateJoined = DateTime.Now.AddMonths (2)
                    },
                    },

                    // },
                    // new Session {
                    // Title = "Future Activity 4",
                    // Date = DateTime.Now.AddMonths (4),
                    // Timeblock = "1pm - 5pm",
                    // Description = "Baking pies",
                    // Category = "Craft",
                    // Address = "1503 NE Schuyler St",
                    // City = "Portland",
                    // Activity1 = "Paint",
                    // Activity2 = "Paint"

                    // }

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