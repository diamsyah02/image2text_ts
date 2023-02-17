import multer from 'multer'
import path from 'path'
import Tesseract from 'tesseract.js'

export const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads/"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    )
  },
})

export const convert = async (img?: String) => {
  try {
    return {
      code: 200,
      status: 1,
      data: await (await Tesseract.recognize(img)).data.text
    }
  } catch (e) {
    return {
      code: 400,
      status: 0,
      data: e
    }
  }
}