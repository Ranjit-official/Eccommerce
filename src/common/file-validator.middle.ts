import { diskStorage } from 'multer';
import { randomStringGenerator } from 'src/utils/helper';

export const fileMiddleware = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const fileName = randomStringGenerator(15) + '-' + file.originalname;
      callback(null, fileName);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.startsWith('image/')) {
      return callback(new Error('Only image files are allowed'), false);
    }
    callback(null, true);
  },
};
