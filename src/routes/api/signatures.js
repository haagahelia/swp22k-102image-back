import express from "express"
import { readFileSync } from 'fs';
import knex from "../../db/index.js"
import {
    successHandler,
    requestErrorHandler,
    databaseErrorHandler
} from "../../responseHandlers/index.js"

const signatureRouter = express()

// Test route for getting signatures from db
signatureRouter.get("/", async (_, res) => {
    try {
        const signatures = await knex("Signature")
        return signatures 
        ? successHandler(res, signatures) 
        : requestErrorHandler(res, 404, "Request error. Data not found.")
    } catch (err) {
        databaseErrorHandler(res, err)
    }
})

//POST mapping to save image to DB
signatureRouter.post("/", (req, res) => {
    //Note req.files not req.body!
    const files = req.files;

    if (!files) return requestErrorHandler(res, 404, "Signature not found in body")

    const image = files.signature;

    var filecontents = readFileSync(image.tempFilePath).toString();

    //knex operation
    knex
        .insert({image : filecontents})
        .into("Signature")
        .then(rowIdArr => successHandler(res, rowIdArr))
        .catch(err => databaseErrorHandler(res, err))
})

export default signatureRouter