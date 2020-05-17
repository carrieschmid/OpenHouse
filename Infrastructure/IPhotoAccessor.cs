using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Infrastructure {
    public interface IPhotoAccessor {
        PhotoUploadResult AddPhoto (IFormFile file);
        string DeletePhoto (string publicId);

    }
}