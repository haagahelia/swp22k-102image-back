import winston from "winston";

const logConfiguration = {
    'transports': [
        new winston.transports.Console({
            level: "silly"
        }),
        new winston.transports.File({
            filename: './logs/winstonBackendLog.log',
            level: "debug"
        }),
    ]
};

export const logger = winston.createLogger(logConfiguration); 