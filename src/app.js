import express from "express";
import cors from 'cors';
import fileupload from 'express-fileupload'

import signatureRouter from "./routes/api/signatures.js";

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

app.use("/api/signatures", signatureRouter)

export default app