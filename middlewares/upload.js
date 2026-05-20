const multer = require("multer");

const { CloudinaryStorage } =
require("multer-storage-cloudinary");

const cloudinary =
require("../config/cloudinary");

const storage =
new CloudinaryStorage({

    cloudinary,

    params: async (req, file) => {

       return {

    folder: "RID-Bharat-Thumbnails",

    asset_folder:
        "RID-Bharat-Thumbnails",

    use_filename: true,

    unique_filename: false,

    allowed_formats: [
        "jpg",
        "jpeg",
        "png",
        "webp"
    ],

    public_id:
        Date.now() +
        "-" +
        file.originalname
};

    }

});

const upload =
multer({

    storage,

    limits: {

        fileSize:
            5 * 1024 * 1024

    },

    fileFilter:
        (req, file, cb) => {

            const allowed = [

                "image/png",

                "image/jpeg",

                "image/jpg",

                "image/webp"

            ];

            if (
                allowed.includes(
                    file.mimetype
                )
            ) {

                cb(null, true);

            }

            else {

                cb(
                    new Error(
                        "Only image files allowed"
                    )
                );

            }

        }

});

module.exports = upload;