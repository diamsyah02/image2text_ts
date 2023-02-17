import express, { Express, Request, Response } from "express"
import multer from "multer"
import fs from "fs"
import { diskStorage, convert } from './config'

const app: Express = express()
console.log('RESTful API server started on: ' + 4000)
app.route('/').get(function (req: Request, res: Response) {
  res.status(200).send(`Api image to text with express js`)
})
app.route('/').post(multer({ storage: diskStorage }).single('image'), async function (req: Request, res: Response) {
  const file = req.file?.path
  if (!file) {
    res.status(400).send({
      status: false,
      data: "No File is selected.",
    })
  }
  const result = await convert(file)
  await fs.unlinkSync(file!)
  res.status(result.code).send({
    status: result.status,
    data: result.data,
  })
})
app.listen(4000)