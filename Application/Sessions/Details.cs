using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Sessions {
    public class Details {
        public class Query : IRequest<SessionDto> {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, SessionDto> {
            private readonly DataContext _context;
            public IMapper _mapper { get; set; }

            public Handler (DataContext context, IMapper mapper) {
                _mapper = mapper;

                _context = context;
            }

            public async Task<SessionDto> Handle (Query request, CancellationToken cancellationToken) {

                var session = await _context.Sessions
                    .FindAsync (request.Id);

                if (session == null)
                    throw new RestException (HttpStatusCode.NotFound, new { session = "Not found" });

                var sessionToReturn = _mapper.Map<Session, SessionDto> (session);

                return sessionToReturn;
            }
        }
    }
}