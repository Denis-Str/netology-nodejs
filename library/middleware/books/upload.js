const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb){
    cb(null, 'public/books');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
    console.log(file.mimetype)
  }
});

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
const fileFilter = (req, file, cb) => {
  if (true) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'));
  }
};

module.exports = multer({ storage });