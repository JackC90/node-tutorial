const Logger = require('./logger');
const os = require('os');
const fs = require('fs');
const http = require('http');

// console.log(__filename);
// console.log(__dirname);
// console.log(os.freemem());

// Asynchronous method - preferred
// console.log(fs.readdirSync('./'));

// Connecting to Server
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hello World');
    res.end();
  }

  if (req.url === '/api/courses') {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

server.on('connection', (socket) => {
  console.log('New connection...')
});

server.listen(3000);
console.log('Listening on port 3000...');

// Calling a class, and using emitter
const logger = new Logger();

// Register a listener
logger.on('messageLogged', (arg) => {
  console.log('Listener called', arg);
});

logger.log('Hello, I\' logged!');


