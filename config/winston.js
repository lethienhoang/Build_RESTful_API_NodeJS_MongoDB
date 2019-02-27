const winston = require('winston');
const appRoot = require('app-root-path');
// level - Level of messages to log.
// filename - The file to be used to write log data to.
// handleExceptions - Catch and log unhandled exceptions.
// json - Records log data in JSON format.
// maxsize - Max size of log file, in bytes, before a new file will be created.
// maxFiles - Limit the number of files created when the size of the logfile is exceeded.
// colorize - Colorize the output. This can be helpful when looking at console logs.
// Logging levels indicate message priority and are denoted by an integer. Winston uses npm logging levels that are prioritized from 0 to 5 (highest to lowest):

// 0: error
// 1: warn
// 2: info
// 3: verbose
// 4: debug
// 5: silly

var options = {
    file: {
      level: 'info',
      filename: `${appRoot}/logs/app.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };

  // instantiate a new Winston Logger with the settings defined above
const logger =  winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false,
});

logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;