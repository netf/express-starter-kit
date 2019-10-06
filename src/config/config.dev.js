const config  = {
    max_content_length_accepted: 102400000,
    logFileDir: './log',
    logFileName: 'app-%DATE%.log',
    dbHost: process.env.dbHost || 'localhost',
    dbPort: process.env.dbPort || '27017',
    dbName: process.env.dbName || 'trains',
    serverPort: process.env.serverPort || 3000,
};

export default config;