import multer from "multer";

const createStorage = (path) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, global.__basedir + path);
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}_${file.originalname}`);
        },
    });
    return storage
}

export const productMulter = multer({ storage: createStorage("/uploads/products") });

export const categoryMulter = multer({ storage: createStorage("/uploads/categories") });
