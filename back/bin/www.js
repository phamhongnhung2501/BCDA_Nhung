/** Module dependencies.*/
const app = require('../app');
const http = require('http');
const mqtt = require('mqtt');
const config = require('../config/network');
const logColor = require('../src/untils/logColor');
const service = require('./services/services');
const fakeData = require('./services/socket_data').farm;

/** Get port from environment and store in Express.*/
let port = normalizePort(process.env.PORT || config.port);
app.set('port', port);

/** Create HTTP server.*/
let server = http.createServer(app);
const io = require('socket.io')(server);

/** MQTT setup.*/
// let client = mqtt.connect('mqtt://212.237.29.129');
let client = mqtt.connect('mqtt://m14.cloudmqtt.com', {
      username: 'twrtixzd',
      password: 'sk0zWGzIUUOZ',
      port: 11667
    }
);
// let client = mqtt.connect('mqtt://212.237.29.129', {
//       username: 'nhungdaika',
//       password: '12354',
//       port: 1883
//     }
// );
/** MQTT connection.*/
client.on('connect', function () {
  console.log("connected!!!");
  client.subscribe('send_data', function (err) {
    if (err) throw err;
  });
  client.subscribe('control_status',{qos:1});
});
/** MQTT message.*/
client.on('message', async function (topic, message) {
  // console.log(message);
  let data = JSON.parse(message);
  if(topic ==="send_data") {
    await service.saveData(data);
    io.sockets.emit('farm_'+data.sub_id, data);
  }
  if(topic ==="control_status") {
    io.sockets.emit('controller_'+data.id, data);
  }
});

/** Socket.io connection.*/
io.on('connection', function (socket) {
  let sub_id = socket.handshake.query.sub_id;
  setInterval(async function(){
    let data = fakeData(sub_id);
    let topic = "farm_G07";
    // let topic = "farm_"+data.sub_id;
    await service.saveData(data);
    socket.emit(topic, data);
    // console.log(data);
  }, 3000);
  // console.log(fakeData(sub_id));
  socket.on("controller", async function (data) {
    // console.log(data)
    client.publish("control", JSON.stringify(data))
  });
});

/** Listen on provided port, on all network interfaces.*/
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/** Normalize a port into a number, string, or false.*/
function normalizePort(val) {
  let port = parseInt(val, 10);
  if (isNaN(port)) return val; // named pipe
  if (port >= 0) return port; // port number
  return false;
}

/** Event listener for HTTP server "error" event.*/
function onError(error) {
  if (error.syscall !== 'listen') throw error;
  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/** Event listener for HTTP server "listening" event.*/
function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string' ? 'pipe ' + addr : addr.port;
  console.log('Listening on ' + logColor(`color:yellow${config.hostname}:${bind}`));
}

console.log(logColor(`color:pink
███████╗ █████╗ ██████╗ ███╗   ███╗
██╔════╝██╔══██╗██╔══██╗████╗ ████║
█████╗  ███████║██████╔╝██╔████╔██║
██╔══╝  ██╔══██║██╔══██╗██║╚██╔╝██║
██║     ██║  ██║██║  ██║██║ ╚═╝ ██║
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝
`));

