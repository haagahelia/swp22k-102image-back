import express from 'express';

const app = express();

//Test localhost:8787 from browser
app.get('/', (_request, response) => {
  response.send('<h1>Hello World!</h1>')
})

const PORT = 8787
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})