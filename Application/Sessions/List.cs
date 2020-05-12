using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Sessions {
    public class List {
        public class Query : IRequest<List<SessionDto>> { }
        public class Handler : IRequestHandler<Query, List<SessionDto>> {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler (DataContext context, IMapper mapper) {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<SessionDto>> Handle (Query request, CancellationToken cancellationToken) {
                var sessions = await _context.Sessions

                    .ToListAsync ();

                return _mapper.Map<List<Session>, List<SessionDto>> (sessions);
            }
        }
    }
}