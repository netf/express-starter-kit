import config from './config/config';
import logger from './utils/logger';
import connectToDb from './db/mongodb';
import app from './app';

logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

const port = config.serverPort;

async function main() {
    await connectToDb();
    app.listen(port, () => {
        logger.info('server started - ', port);
    });
}

main();