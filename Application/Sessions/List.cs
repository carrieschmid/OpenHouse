using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Sessions {
    public class List {
        public class Query : IRequest<List<Session>> { }
        public class Handler : IRequestHandler<Query, List<Session>> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                _context = context;
            }

            public async Task<List<Session>> Handle (Query request, CancellationToken cancellationToken) {

                var sessions = await _context.Sessions
                    .ToListAsync ();

                return sessions;
            }
        }
    }
}