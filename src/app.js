// Core modules
import express from "express";
import bodyParser from "body-parser";

// Security modules
import cors from "cors";
import morgan from 'morgan';
import helmet from 'helmet';
import contentLength from 'express-content-length-validator';

import logger from './utils/logger';
import cars from './routes/cars.route';
import config from './config/config.dev';

logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

const app = express();
app.use(helmet());
app.use(cors());
app.use(contentLength.validateMax({ max: config.max_content_length_accepted }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev", { "stream": logger.stream }));

// routes
app.use('/cars', cars);

app.get('/', (req, res) => {
    res.send('Invalid endpoint!');
});


export default app;