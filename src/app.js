// core modules
import express from 'express';
import bodyParser from 'body-parser';

require('dotenv').config();

// security modules
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import contentLength from 'express-content-length-validator';

// passport
const passport = require('passport');
require('./services/passport');

// configs and logging
import logger from './utils/logger';
import config from './config/config';

// routes
import userRoutes from './routes/user';

logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

const app = express();

app.use(helmet());
app.use(cors());
app.use(passport.initialize());
app.use(contentLength.validateMax({ max: config.max_content_length_accepted }));
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  if (err) {
      res.status(400).send({
        message: "Invalid data"
      })
      return;
    }
    next();
  });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev", { "stream": logger.stream }));

// API routes
app.use('/api/user', userRoutes);

// Catch all 404 route
app.use('*', (req, res) => {
  res.status(404).send({
    message: "Not found"
  });
});

export default app;