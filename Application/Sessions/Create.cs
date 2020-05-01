using System;
using System.Threading;
using System.Threading.Tasks;
// using Application.Interfaces;
using Domain;
// using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Sessions {
    public class Create {
        public class Command : IRequest {
            public Guid Id { get; set; }
            //Guid allows to create id from service side or client side
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime Date { get; set; }
            public string Timeblock { get; set; }
            public string Address { get; set; }
            public string City { get; set; }

        }

        // public class CommandValidator : AbstractValidator<Command> {
        //     public CommandValidator () {
        //         RuleFor (x => x.Title).NotEmpty ();
        //         RuleFor (x => x.Description).NotEmpty ();
        //         RuleFor (x => x.Category).NotEmpty ();
        //         RuleFor (x => x.Date).NotEmpty ();
        //         RuleFor (x => x.Timeblock).NotEmpty ();
        //         RuleFor (x => x.City).NotEmpty ();
        //         RuleFor (x => x.Address).NotEmpty ();
        //     }
        // }

        public class Handler : IRequestHandler<Command> {
            private readonly DataContext _context;
            public Handler (DataContext context) {
                _context = context;
            }

            public async Task<Unit> Handle (Command request, CancellationToken cancellationToken)
            //this is a meditr unit, doeesn't return anything
            {
                var session = new Session {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    Date = request.Date,
                    Timeblock = request.Timeblock,
                    Address = request.Address,
                    City = request.City,

                };
                _context.Sessions.Add (session);

                var success = await
                _context.SaveChangesAsync () > 0;

                if (success) return Unit.Value;

                throw new Exception ("Problem saving changes.");

            }
        }
    }
}