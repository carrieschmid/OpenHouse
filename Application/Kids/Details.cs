using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Kids {
    public class Details {
        public class Query : IRequest<Kid> {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Kid> {
            private readonly DataContext _context;

            public Handler (DataContext context) {

                _context = context;
            }

            public async Task<Kid> Handle (Query request, CancellationToken cancellationToken) {

                var kid = await _context.Kids
                    .FindAsync (request.Id);

                return kid;
            }
        }
    }
}