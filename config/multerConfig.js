const multer = require('multer');
const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const uploadedImagesPath = path.join(__dirname, '..', 'public', 'UploadedImages');

        // Check if the directory exists
        fs.access(uploadedImagesPath, fs.constants.F_OK, (err) => {
            if (err) {
                // Directory does not exist, create it
                fs.mkdir(uploadedImagesPath, { recursive: true }, (err) => {
                    if (err) {
                        console.error(err);
                        return cb(err); // Call the callback with an error
                    }
                    console.log('Created directory for uploaded images');
                    cb(null, uploadedImagesPath); // Call the callback with the path
                });
            } else {
                // Directory exists
                cb(null, uploadedImagesPath); // Call the callback with the path
            }
        });
    },

    filename: function(req, file, cb) {
        const now = dayjs();
        // Format the filename to avoid colons and spaces
        const formattedDate = now.format('YYYY-MM-DD_HH-mm-ss'); // Replace colons with dashes
        cb(null, `${formattedDate},${file.originalname}`); // Use template literals for better readability
    }
});

const upload = multer({ storage: storage });
module.exports = upload;
