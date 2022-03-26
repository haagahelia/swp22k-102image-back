import express from "express";
import knex from "./db/index.js";
import cors from 'cors';
import fileupload from 'express-fileupload'
import { readFileSync } from 'fs';
import { logger } from "./utils/logger.js";
import {
  successHandler,
  requestErrorHandler,
  serverErrorHandler
} from "./responseHandlers/index.js"

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileupload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

//Test localhost:8787 from browser
app.get("/", (_, res) => {
  res.send('<h1>Hello World!</h1>')
})

// Test route for getting signatures from db
app.get("/api/signatures", async (_, res) => {
  try {
    const signatures = await db("Signature")
    return signatures 
    ? successHandler(res, signatures) 
    : requestErrorHandler(res, 404, "Request error. Data not found.")
  } catch (err) {
    serverErrorHandler(res, err)
  }
})

//POST mapping to save image to DB
app.post("/api/signatures", (req, res) => {
  //Note req.files not req.body!
  const body = req.files;

  if (!body) return requestErrorHandler(res, 404, "Signature not found in body")

  const image = body.signature;

  var filecontents = readFileSync(image.tempFilePath).toString();

  //knex operation
  knex
    .insert({image : filecontents})
    .into("Signature")
    .then(data => {
      return data 
      ? successHandler(res, data)
      : requestErrorHandler(res, 400)
    })
    .catch(err => serverErrorHandler(res, err))
})

const PORT = 8787
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})