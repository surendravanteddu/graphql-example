const config = require('../config')
const winston = require('winston')
const { format } = winston
const path = require('path')

require('winston-daily-rotate-file')

const transport = new (winston.transports.DailyRotateFile)({
    filename: path.join(config.logging.path, 'api-%DATE%.log'),
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
})

/**
 * Creating a logger instance that logs each message with prefix of time stamp
 * All the message are written inside log files
 *
 * @type {winston.Logger}
 */
const APILogger = winston.createLogger({
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    level: config.logging.level,
    transports: [
        transport
    ]
})

module.exports = APILogger
