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

namespace Application.Comments {
    public class Create {
        public class Command : IRequest<CommentDto> {

            public string Body { get; set; }
            public Guid SessionId { get; set; }
            public string Username { get; set; }

        }

        public class Handler : IRequestHandler<Command, CommentDto> {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler (DataContext context, IMapper mapper) {
                _mapper = mapper;
                _context = context;
            }

            public async Task<CommentDto> Handle (Command request, CancellationToken cancellationToken)
            //this is a meditr unit, doeesn't return anything
            {
                var session = await _context.Sessions.FindAsync (request.SessionId);
                if (session == null)
                    throw new RestException (HttpStatusCode.NotFound, new { Session = "Not found" });

                var user = await _context.Users.SingleOrDefaultAsync (x => x.UserName == request.Username);

                var comment = new Comment {
                    Author = user,
                    Session = session,
                    Body = request.Body,
                    CreatedAt = DateTime.Now
                };

                session.Comments.Add (comment);

                var success = await
                _context.SaveChangesAsync () > 0;

                if (success) return _mapper.Map<CommentDto> (comment);
                //this list what we're mapping to and what we're mapping from 

                throw new System.Exception ("Problem saving changes.");

            }
        }
    }
}