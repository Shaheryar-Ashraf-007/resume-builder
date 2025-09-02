import multer from 'multer';
import path from 'path';

// Set up storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

// File filter to accept only specific file types
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type'), false);
    }
};

// Initialize multer with storage and file filter
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // Limit files to 5MB
    },
    fileFilter: fileFilter
});

// Middleware function for handling uploads
export async function uploads(req, res, next) {
    upload.fields([{ name: 'Thumbnail' }, { name: 'profileImage' }])(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: "Failed to upload files", error: err.message });
        }
        next();
    });
}