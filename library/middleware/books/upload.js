const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb){
    cb(null, 'public/books');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const allowedTypes = ['text/plain'];
const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'));
  }
};

module.exports = multer({ storage, fileFilter });