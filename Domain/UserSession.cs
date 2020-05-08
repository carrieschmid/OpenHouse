using System;

namespace Domain {
    public class UserSession {
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public Guid SessionId { get; set; }
        public virtual Session Session { get; set; }

        public DateTime DateJoined { get; set; }

        public bool IsHost { get; set; }

    }
}