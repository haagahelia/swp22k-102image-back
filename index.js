import express from 'express';
import db from './db/index.js';

const app = express();

//Test localhost:8787 from browser
app.get('/', (_request, response) => {
  response.send('<h1>Hello World!</h1>')
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

const PORT = 8787
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})