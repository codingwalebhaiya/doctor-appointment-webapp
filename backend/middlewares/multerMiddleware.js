import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;

// Multer is a node. js middleware for handling multipart/form-data , which is primarily used for uploading files. It is written on top of busboy for maximum efficiency. NOTE: Multer will not process any form which is not multipart ( multipart/form-data ).
//Multer is a Node.js middleware that's used to handle file uploads in web applications. It's often used with Express to upload multipart/form-data to a server.
//Multer is a Node.js middleware that's used to handle file uploads in web applications. It's often used with Express to upload multipart/form-data to a server.
// Multer can help with the following:
// File handling: Multer can simplify the process of receiving, processing, and storing files.
// File validation: Multer can validate and limit file uploads.
// Cloud storage: Multer is compatible with cloud storage services.
// File renaming: Multer can rename files.
// File filtering: Multer can filter files.
// File size setting: Multer can set file sizes.
// File type setting: Multer can set file types.
// Multer works by parsing multipart/form-data forms and attaching the files and text fields to the request object. It can be used as a middleware for routes that handle file uploads.
// To use Multer, you can add an <input> element of type "file" to a form. The input element should have a name attribute so that it can be identified when the form is submitted
