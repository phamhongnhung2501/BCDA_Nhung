const ip = require('ip');

module.exports = {
  "hostname": ip.address(),
  "port": "8001"
};