import config from './config/config.dev';
import logger from './utils/logger';
import connectToDb from './db/mongodb';
import app from './app';

logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

const port = config.serverPort;

if (process.listeners('unhandledRejection').length < 1) {
    process.on('unhandledRejection', (reason, promise) => {
      console.error(reason);
      process.exit(1);
    });
}
  
if (process.listeners('uncaughtException').length < 1) {
    process.on('uncaughtException', (err) => {
      console.error(err);
      process.exit(1);
    });
}

async function main() {
    await connectToDb();
    app.listen(port, () => {
        logger.info('server started - ', port);
    });
}

main();