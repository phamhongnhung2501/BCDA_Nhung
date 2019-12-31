const setting = {
    "user": "mongo",
    "host": "mongodb://taiga.tinasoft.com.vn/fwork",
    "password": "mongo",
    "database": "fwork",
    "port": 1234,
    "url": "mongodb://localhost/farm",
};
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    keepAlive: true,
    autoIndex: true, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 50, // Maintain up to 10 socket connections

    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};
module.exports = {
    setting,
    options
};
