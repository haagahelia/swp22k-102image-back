import express from "express";
//"db" is knex, change to knex for clarity?
import db from "./db/index.js";

const app = express();

app.use(express.json());

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
  const image = req.body
  console.log(image)
  //knex operation
  db
    .insert(image)
    .into("Signature")
    .then(data => {
      console.log(data)
      res.status(200).send(data).end()
    })
    .catch(err => console.log(err))
})

const PORT = 3306
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})