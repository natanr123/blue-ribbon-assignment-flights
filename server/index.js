/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./util//logger');

const argv = require('./util/argv');
const port = require('./util//port');
const setup = require('./middlewares/frontendMiddleware');
const { resolve } = require('path');
const http = require('http');
const fs = require('fs');
const https = require('https');

const app = express();
// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

app.get('/env', (req, res) => {
  const env = {
    apiHost: process.env.API_HOST,
  };
  res.send(env);
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const redirectWWW = false;
if (redirectWWW) {
  app.all(/.*/, (req, res, next) => {
    const host = req.header('host');
    if (host.match(/^www\..*/i)) {
      next();
    } else {
      res.redirect(301, `http://www.${host + req.url}`);
    }
  });
}

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
// const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.

const server = http.createServer(app);

const anyHost = '0.0.0.0';
server.listen(port, anyHost);
if (process.env.LOCAL_SSL === 'true') {
  const credentials = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
  };
  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(8443, anyHost);
}


logger.appStarted(port, prettyHost);

