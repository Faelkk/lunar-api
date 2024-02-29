import multer from "multer";
import CustomError from "../../utils/customError";

const storage = multer.memoryStorage();

export const configureMulter = (fieldName: string, allowedTypes: string[]) => {
  return multer({
    storage,
    fileFilter: (req, file, cb) => {
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(
          new CustomError(
            "Invalid file type. Only specific file types are allowed.",
            400
          ) as any | null,
          false
        );
      }
    },
  }).single(fieldName);
};
