using System;
using System.Collections.Generic;

namespace Domain {
    public class Session {
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
        public virtual ICollection<UserSession> UserSessions { get; set; }

    }
}