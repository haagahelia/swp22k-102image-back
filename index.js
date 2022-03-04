import express from 'express';
import knex from "./db/index.js"

const app = express();
const signatureRouter = express.Router()

//Test localhost:8787 from browser
app.get('/', (_request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// Get all signatures
signatureRouter.get("/api/signatures", async (_, res) => {
  try {
    const signatures = await knex("Signature")
    res.status(200).json(signatures)
  } catch (err) {
    console.log(err)
  }
})

app.use(signatureRouter)

const PORT = 8787
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})