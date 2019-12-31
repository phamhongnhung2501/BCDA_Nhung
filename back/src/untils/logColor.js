function logColor(str) {
    // -----------------------Effect--------------------------
    str = str.replace(/color:reset/g, '\x1b[0m');
    str = str.replace(/log_bright/g, '\x1b[1m');
    str = str.replace(/log_dim/g, '\x1b[2m');
    str = str.replace(/log_underscore/g, '\x1b[4m');
    str = str.replace(/log_blink/g, '\x1b[5m');
    str = str.replace(/log_reverse/g, '\x1b[7m');
    str = str.replace(/log_hidden/g, '\x1b[8m');

    // -----------------------Text-color--------------------------
    str = str.replace(/color:black/g, '\x1b[30m');
    str = str.replace(/color:red/g, '\x1b[31m');
    str = str.replace(/color:green/g, '\x1b[32m');
    str = str.replace(/color:yellow/g, '\x1b[33m');
    str = str.replace(/color:light_blue/g, '\x1b[34m');
    str = str.replace(/color:pink/g, '\x1b[35m');
    str = str.replace(/color:blue/g, '\x1b[36m');
    str = str.replace(/color:white/g, '\x1b[37m');

    // -----------------------Background--------------------------
    str = str.replace(/background:black/g, '\x1b[40m');
    str = str.replace(/background:red/g, '\x1b[41m');
    str = str.replace(/background:green/g, '\x1b[42m');
    str = str.replace(/background:yellow/g, '\x1b[43m');
    str = str.replace(/background:light_blue/g, '\x1b[44m');
    str = str.replace(/background:pink/g, '\x1b[45m');
    str = str.replace(/background:blue/g, '\x1b[46m');
    str = str.replace(/background:white/g, '\x1b[47m');

    str = str.replace(/log_clear/g, '\033[2J');

    str = str + ' \x1b[0m';
    return str;
}
module.exports = logColor;