const multer = require('multer');
const path = require('path')
// Set up multer storage for resume uploads
const storage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   cb(null, './uploads'); // Uploads will be stored in the "uploads" directory
  // },
  destination: path.join(__dirname, 'uploads'),
  // filename: (req, file, cb) => {
  //   console.log(file);
  //   cb(null, Date.now() + path.extname(file.originalname));
  // },
  
  filename: (req, file, callback) => {
    callback(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;