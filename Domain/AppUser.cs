using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain {
    public class AppUser : IdentityUser {
        public string DisplayName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Interests { get; set; }
        public string BgCheck { get; set; }
        public string FirstAid { get; set; }
        public string Terms { get; set; }

        //other are already built into Identity

        public virtual ICollection<UserSession> UserSessions { get; set; }
    }
}