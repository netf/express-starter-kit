import * as winston from 'winston';
import * as rotate from 'winston-daily-rotate-file';
import config from '../config/config.dev';
import * as fs from 'fs';

const dir = config.logFileDir;

// eslint-disable-next-line
if (!fs.existsSync(dir)) { 
    fs.mkdirSync(dir); // eslint-disable-line
}

let logger = new winston.createLogger({
    level: 'info',
    transports: [
        new (winston.transports.Console)({
            colorize: false,
        }),
        new winston.transports.DailyRotateFile({
            filename: config.logFileName,
            dirname: config.logFileDir,
            zippedArchive: true,
            maxsize: '20m',
            maxFiles: '14d',
            datePattern: 'YYYY-MM-DD'
        })
    ]
});

export default logger;
