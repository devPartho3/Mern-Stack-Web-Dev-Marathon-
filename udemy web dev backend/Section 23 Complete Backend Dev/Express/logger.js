import { createLogger,format,transports } from "winston";
const { combine, timestamp, printf,json,colorize } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

//create a winston logger instance
const logger = createLogger({
    level: "info",
    format: combine(
        colorize(),
        timestamp(),
        json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: "app.log" })
    ]
});

export default logger;