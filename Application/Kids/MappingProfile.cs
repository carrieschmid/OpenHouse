using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Kids {
    public class MappingProfile : Profile {

        public MappingProfile () {
            CreateMap<Kid, KidDto> ();
            // CreateMap<UserKid, ParentDto> ()
            //     .ForMember (d => d.Username, o => o.MapFrom (s => s.AppUser.UserName))
            //     .ForMember (d => d.DisplayName, o => o.MapFrom (s => s.AppUser.DisplayName));

        }
    }
}