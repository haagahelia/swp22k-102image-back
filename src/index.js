import app from "./app.js"
import { logger } from "./utils/logger.js";

const PORT = 8787
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})