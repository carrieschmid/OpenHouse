using System;

namespace Domain {
    public class UserKid {
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public Guid KidId { get; set; }
        public virtual Kid Kid { get; set; }

        public bool IsParent { get; set; }

    }
}