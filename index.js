import express from "express";
//"db" is knex, change to knex for clarity?
import db from "./db/index.js";
import cors from 'cors';
import fileupload from 'express-fileupload';

import { readFileSync } from 'fs';

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
    res.status(200).json(signatures)
  } catch (err) {
    console.log(err)
  }
})

//POST mapping to save image to DB
app.post("/api/signatures", (req, res) => {
  //Note req.files not req.body!
  const body = req.files;

  const image = body.signature;
  var filecontents = readFileSync(image.tempFilePath).toString();
  //knex operation
  db
    .insert({image : filecontents})
    .into("Signature")
    .then(data => {
      res.status(200).send({status : "ok",data : data}).end()
    })
    .catch(err => console.log(err))
})

const PORT = 8787
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})