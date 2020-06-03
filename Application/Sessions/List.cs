using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Sessions {
    public class List {
        public class SessionsEnvelope {
            public List<SessionDto> Sessions { get; set; }
            public int SessionCount { get; set; }
        }
        public class Query : IRequest<SessionsEnvelope> {
            public Query (int? limit, int? offset) {
                Limit = limit;
                Offset = offset;
            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }

        }
        public class Handler : IRequestHandler<Query, SessionsEnvelope> {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler (DataContext context, IMapper mapper) {
                _mapper = mapper;
                _context = context;
            }

            public async Task<SessionsEnvelope> Handle (Query request, CancellationToken cancellationToken) {

                var queryable = _context.Sessions.AsQueryable ();
                var sessions = await queryable
                    .Skip (request.Offset ?? 0)
                    .Take (request.Limit ?? 3).ToListAsync ();

                return new SessionsEnvelope {
                    Sessions = _mapper.Map<List<Session>, List<SessionDto>> (sessions),
                        SessionCount = queryable.Count ()
                };

            }
        }
    }
}