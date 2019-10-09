import Mongoose from 'mongoose';
import logger from '../utils/logger';
import config from '../config/config';

Mongoose.Promise = global.Promise;

const connectToDb = async () => {
    const mongoUri = config.mongoUri;
    try {
        await Mongoose.connect(mongoUri);
        logger.info('Connected to mongo!!!');
    }
    catch (err) {
        logger.error('Could not connect to MongoDB');
    }
};

export default connectToDb;