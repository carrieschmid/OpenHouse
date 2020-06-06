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

namespace Application.Kids {
    public class List {
        public class Query : IRequest<List<KidDto>> { }
        public class Handler : IRequestHandler<Query, List<KidDto>> {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler (DataContext context, IMapper mapper) {
                _mapper = mapper;

                _context = context;
            }

            public async Task<List<KidDto>> Handle (Query request, CancellationToken cancellationToken) {

                var kids = await _context.Kids
                    .ToListAsync ();

                return _mapper.Map<List<Kid>, List<KidDto>> (kids);
            }
        }
    }
}