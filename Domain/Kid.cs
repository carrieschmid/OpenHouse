using System;
using System.Collections.Generic;

namespace Domain {
    public class Kid {
        public Guid Id { get; set; }
        //Guid allows to create id from service side or client side
        public string Name { get; set; }
        public string Age { get; set; }
        public string Interests { get; set; }
        public string WorkingOn { get; set; }

        public virtual ICollection<UserKid> UserKids { get; set; }

    }
}