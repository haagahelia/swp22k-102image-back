import { logger } from "../utils/logger.js";

export const serverErrorHandler = (res, message) => {
    if(!message) { 
        message = "Server error.";
    }

    logger.error(message);

    res.status(500).json({ message: message }).end();
}

export const requestErrorHandler = (res, message) => {
    if(!message) { 
        message = "Request error.";
    }
    
    logger.error(message);

    res.status(400).json({ message: message }).end();
}

export const successHandler = (res, data, message) => {
    if(!message) { 
        message = "Success."; 
    }
    logger.verbose(message);

    res.status(200).send(data).end();  
}