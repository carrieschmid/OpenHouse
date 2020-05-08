using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Kids {
    public class List {
        public class Query : IRequest<List<Kid>> { }
        public class Handler : IRequestHandler<Query, List<Kid>> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                _context = context;
            }

            public async Task<List<Kid>> Handle (Query request, CancellationToken cancellationToken) {

                var kids = await _context.Kids
                    .ToListAsync ();

                return kids;
            }
        }
    }
}