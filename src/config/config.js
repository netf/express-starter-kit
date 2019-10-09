const config  = {
    max_content_length_accepted: 102400000,
    logFileDir: './log',
    logFileName: 'app-%DATE%.log',
    dbHost: process.env.DBHOST || 'localhost',
    dbPort: process.env.DBPORT || '27017',
    dbName: process.env.DBNAME || 'trains',
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/express-starter-kit',
    serverPort: process.env.PORT || 3000,
    secret: process.env.SECRET || 'super.important.secret', 
};

export default config;