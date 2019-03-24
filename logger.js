// Classes and Emitters
// Class
const EventEmitter = require('events');

var url = 'http://mylogger.io/log';

// New class Logger adds methods to class EventEmitter
class Logger extends EventEmitter {
  log(message) {
    // Send http request
    console.log(message);

    // Raise an event
    this.emit('messageLogged', {
      id: 1,
      url: 'http://',
    });
  }
}


module.exports = Logger;