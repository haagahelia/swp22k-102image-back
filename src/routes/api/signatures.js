import express from "express"
import { readFileSync } from 'fs';
import knex from "../../db/index.js"
import {
  successHandler,
  requestErrorHandler,
  databaseErrorHandler
} from "../../responseHandlers/index.js"

const signatureRouter = express()

// GET ALL http:localhost:8787/api/signatures/all
signatureRouter.get("/all", async (_, res) => {
  try {
    const signatures = await knex("Signature")
    return signatures
      ? successHandler(res, signatures)
      : requestErrorHandler(res, 404, "Request error. Data not found.")
  } catch (err) {
    databaseErrorHandler(res, err)
  }
})

//GET ONE BY ID http:localhost:8787/api/signatures/:id
signatureRouter.get("/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    requestErrorHandler(res, 400, `Invalid id: ${req.params.id}`);
  } else {
    knex
      .select()
      .from("Signature")
      .where("id", req.params.id)
      .then(sigArray => {
        if (sigArray.length === 1) {
          successHandler(res, sigArray);
        } else {
          requestErrorHandler(res, 404, "Signature id not found.");
        }
      })
      .catch(error => databaseErrorHandler(res, error))
  }
})

//SAVE TO DB POST http:localhost:8787/api/signatures
signatureRouter.post("/", (req, res) => {
  //Note req.files not req.body!
  const files = req.files;
  if (!files.signature) {
    return requestErrorHandler(res, 404, "Signature not found in file");
  } else {
    const image = files.signature;
    const filecontents = readFileSync(image.tempFilePath).toString();
    knex
      .insert({ image: filecontents })
      .into("Signature")
      .then(rowIdArr => successHandler(res, rowIdArr, "Signature successfully saved."))
      .catch(err => databaseErrorHandler(res, err))
  }
})

//DELETE ONE BY ID http:localhost:8787/api/signatures/:id
signatureRouter.delete("/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    requestErrorHandler(res, 400, `Invalid id: ${req.params.id}`);
  } else {
    knex("Signature")
      .where("id", req.params.id)
      .del()
      .then(rowsAffected => {
        if (rowsAffected === 1) {
          successHandler(res, rowsAffected, `Successfully deleted signature with id: ${req.files.id}.`);
        } else {
          requestErrorHandler(res, 404, "Signature id not found.");
        }
      })
      .catch(error => databaseErrorHandler(res, error))
  }
})

//UPDATE ONE BY ID PUT http:localhost:8787/api/signatures
signatureRouter.put("/", (req, res) => {
  if (!req.files.id) {
    requestErrorHandler(res, 400, "Signature id is missing.");
  } else if (isNaN(req.files.id)) {
    requestErrorHandler(res, 400, `Invalid id: ${req.params.id}`);
  } else {
    const image = req.files.signature;
    const fileContents = readFileSync(image.tempFilePath).toString();
    knex("Signature")
      .where("id", req.files.id)
      .update({ image: fileContents })
      .then(rowsAffected => {
        if (rowsAffected === 1) {
          successHandler(res, rowsAffected, `Successfully updated signature with id: ${req.files.id}.`)
        } else {
          requestErrorHandler(res, 404, "Signature id not found.")
        }
      })
      .catch(error => {
        databaseErrorHandler(res, error)
      })
  }
})

export default signatureRouter