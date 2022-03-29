import app from "./app.js"
import { logger } from "./utils/logger.js";
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 8787
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})