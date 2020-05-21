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
            //Guid allows to create id from service side or client side
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? Date { get; set; }
            public string Timeblock { get; set; }
            public string Address { get; set; }
            public string City { get; set; }

            public string Activity1 { get; set; }

            public string Activity2 { get; set; }

        }

        public class Handler : IRequestHandler<Command> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                _context = context;
            }

            public async Task<Unit> Handle (Command request, CancellationToken cancellationToken)
            //this is a meditr unit, doeesn't return anything
            {
                var session = await _context.Sessions.FindAsync (request.Id);

                if (session == null)
                    throw new Exception ("Not found");

                session.Title = request.Title ?? session.Title;
                session.Description = request.Description ?? session.Description;
                session.Category = request.Category ?? session.Category;
                session.Date = request.Date ?? session.Date;
                session.Timeblock = request.Timeblock ?? session.Timeblock;
                session.Address = request.Address ?? session.Address;
                session.City = request.City ?? session.City;
                session.Activity1 = request.Activity1 ?? session.Activity1;
                session.Activity2 = request.Activity2 ?? session.Activity2;

                var success = await
                _context.SaveChangesAsync () > 0;

                if (success) return Unit.Value;

                throw new Exception ("Problem saving changes.");

            }
        }

    }
}