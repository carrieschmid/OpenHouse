using System;
using System.Collections.Generic;

namespace Domain {
    public class Comment {
        public Guid Id { get; set; }
        public string Body { get; set; }
        public virtual AppUser Author { get; set; }
        public virtual Session Session { get; set; }
        public DateTime CreatedAt { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }

    }
}