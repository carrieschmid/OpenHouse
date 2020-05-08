using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Sessions {
    public class Edit {
        public class Command : IRequest {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public string Age { get; set; }
            public string Interests { get; set; }
            public string WorkingOn { get; set; }

        }

        public class Handler : IRequestHandler<Command> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                _context = context;
            }

            public async Task<Unit> Handle (Command request, CancellationToken cancellationToken)
            //this is a meditr unit, doeesn't return anything
            {
                var kid = await _context.Kids.FindAsync (request.Id);

                if (session == null)
                    throw new Exception ("Not found");

                kid.Name = request.Name ?? kid.Name;
                kid.Age = request.Age ?? kid.Age;
                kid.Inerests = request.Inerests?? kid.Interests;
                kid.WorkingOn = request.WorkingOn ?? kid.WorkingOn;

                var success = await
                _context.SaveChangesAsync () > 0;

                if (success) return Unit.Value;

                throw new Exception ("Problem saving changes.");

            }
        }

    }
}