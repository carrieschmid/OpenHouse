using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles {
    public class ListSessions {
        public class Query : IRequest<List<UserSessionDto>> {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<UserSessionDto>> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                _context = context;
            }

            public async Task<List<UserSessionDto>> Handle (Query request,
                CancellationToken cancellationToken) {
                var user = await _context.Users.SingleOrDefaultAsync (x => x.UserName == request.Username);

                if (user == null)
                    throw new RestException (HttpStatusCode.NotFound, new { User = "Not found" });

                var queryable = user.UserSessions
                    .OrderBy (a => a.Session.Date)
                    .AsQueryable ();

                switch (request.Predicate) {
                    case "past":
                        queryable = queryable.Where (a => a.Session.Date <= DateTime.Now);
                        break;
                    case "hosting":
                        queryable = queryable.Where (a => a.IsHost);
                        break;
                    default:
                        queryable = queryable.Where (a => a.Session.Date >= DateTime.Now);
                        break;
                }

                var sessions = queryable.ToList ();
                var sessionsToReturn = new List<UserSessionDto> ();

                foreach (var session in sessions) {
                    var userSession = new UserSessionDto {
                        Id = session.Session.Id,
                        Title = session.Session.Title,
                        Category = session.Session.Category,
                        Date = session.Session.Date
                    };

                    sessionsToReturn.Add (userSession);
                }

                return sessionsToReturn;
            }
        }
    }
}