using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Sessions {
    public class Details {
        public class Query : IRequest<Session> {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Session> {
            private readonly DataContext _context;

            public Handler (DataContext context) {

                _context = context;
            }

            public async Task<Session> Handle (Query request, CancellationToken cancellationToken) {

                var session = await _context.Sessions
                    .FindAsync (request.Id);

                return session;
            }
        }
    }
}