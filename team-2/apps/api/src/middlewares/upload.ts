import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary';
import path from 'path';

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const ext = path.extname(file.originalname).replace('.', '').toLowerCase();
    return {
      folder: 'api',
      format: ext,
      transformation: [{ crop: 'limit', width: 500, height: 500 }],
    };
  },
});

const upload = multer({ storage });

export default upload;
