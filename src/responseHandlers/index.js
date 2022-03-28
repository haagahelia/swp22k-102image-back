import { logger } from "../utils/logger.js";

export const databaseErrorHandler = (res, dbError, message) => {
    if(!message) { 
        message = "Database error.";
    }
    message += " Db error code: "+dbError.errno;
    message += " Db error message: "+dbError.message;
    logger.error(message);

    return res.status(500).send({ message: message }).end();
}

export const serverErrorHandler = (res, message) => {
    if(!message) { 
        message = "Server error";
    }

    logger.error(message);

    return res.status(500).json({ message: message }).end();
}

export const requestErrorHandler = (res, code, message) => {
    if(!message) { 
        message = "Request error";
    }
    
    logger.error(message);

    if (code) {
        return res.status(code).json({ message: message }).end();
    }

    return res.status(400).json({ message: message }).end();
}

export const successHandler = (res, data, message) => {
    if(!message) { 
        message = "Success request"; 
    }
    logger.verbose(message);

    return res.status(200).send(data).end();  
}