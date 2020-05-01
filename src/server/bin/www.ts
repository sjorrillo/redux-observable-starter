#!/usr/bin/env node
import http from 'http';

import app, { graphqlPath } from '../app';

const normalizePort = (value) => {
  const port = parseInt(value, 10);
  if (isNaN(port)) return value; // named pipe

  if (port >= 0) return port; // port number

  return false;
};

const serverPort = normalizePort(process.env.PORT || '4000');
app.set('port', serverPort);

var server = http.createServer(app);

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof serverPort === 'string' ? `Pipe ${serverPort}` : `Port ${serverPort}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  var addr = server.address();
  var bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`🚀 Server ready at ${bind}`);
  console.log(`🚀 Server ready at http://localhost:${serverPort}${graphqlPath}`);
};

server.listen(serverPort);
server.on('error', onError);
server.on('listening', onListening);
