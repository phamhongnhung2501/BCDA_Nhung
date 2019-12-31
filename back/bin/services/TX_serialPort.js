const serialPort = require('serialport');

const config = require('../../config/serialPort');
const readLine = serialPort.parsers.Readline;
const port = new serialPort(config.port_TX, {
    baudRate: config.baudRate_TX,
});

const delay = time => new Promise(res=>setTimeout(res,time));
const parser = port.pipe(new readLine({ delimiter: '\r\n' }));

port.on('open', async function() {
    console.log('TX___connected!!!');
    port.write('AT\r\n'); await delay(30);
    port.write('AT+MODE=TEST\r\n'); await delay(30);
    port.write('AT+TEST=RFCFG,415\r\n'); await delay(30);
});

async function transfer(command){
    port.write('AT+TEST=TXLRSTR,'+command); await delay(30);
}

parser.on('error', (err) => console.log('[TX]: ', err));
port.on('error', (err) => console.log('[TX]: ', err));
port.on('close', function() {
    console.log('TX disconnect!');
});

module.exports = {
    transfer
};