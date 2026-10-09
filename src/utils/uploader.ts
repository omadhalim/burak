import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 } from "uuid";

const makeUploader = (address: string) => {
  const dir = `./uploads/${address}`;
  fs.mkdirSync(dir, { recursive: true });

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      const extension = path.parse(file.originalname).ext;
      cb(null, `${v4()}${extension}`);
    },
  });

  return multer({ storage });
};

export default makeUploader;