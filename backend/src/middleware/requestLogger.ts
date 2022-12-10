import * as morgan from 'morgan';

const requestLogger = morgan((tokens, req, res) => {
  let msg = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
  ].join(' ');
  if (tokens.method(req, res) === 'POST') {
    msg += ' ' + JSON.stringify(req.body);
  }
  return msg;
});

export default requestLogger;
