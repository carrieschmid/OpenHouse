using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Application.Comments;

namespace Application.Sessions {
    public class SessionDto {
        public Guid Id { get; set; }
        //Guid allows to create id from service side or client side
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string Timeblock { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Activity1 { get; set; }
        public string Activity2 { get; set; }

        [JsonPropertyName ("attendees")]

        public virtual ICollection<AttendeeDto> UserSessions { get; set; }

        public ICollection<CommentDto> Comments { get; set; }

    }
}