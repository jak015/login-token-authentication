import { v7 as uuidv7 } from 'uuid';
import pino from 'pino';
import { pinoHttp } from 'pino-http';

export const logger = pino({
    level: process.env.LOG_LEVEL ?? 'info',
    base: null,
    timestamp: pino.stdTimeFunctions.isoTime,
    redact: {
        paths: ['password', 'req.body.password', 'req.headers.authorization'],
        censor: '[REDACTED]'
    }
});

export const httpLogger = pinoHttp({
    logger,
    genReqId: (req, res) => {
        const existing = req.headers['x-request-id'];
        if (existing) return existing as string;
        const id = uuidv7();
        res.setHeader('x-request-id', id);
        return id;
    },
    serializers: {
        req: (req) => ({
            id: req.id,
            method: req.method,
            url: req.url
        }),
        res: (res) => ({
            statusCode: res.statusCode
        })
    },
    customLogLevel: (_req, res, err) => {
        if (res.statusCode >= 500 || err) {
            return 'error';
        }

        if (res.statusCode >= 400) {
            return 'warn';
        }

        return 'info';
    },
    customSuccessMessage: (req, res) => `${req.method} ${req.url} completed with ${res.statusCode}`,
    customErrorMessage: (req, res, err) => `${req.method} ${req.url} failed with ${err?.message ?? 'unknown error'}`
});
