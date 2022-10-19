"use strict";
exports.__esModule = true;
exports.check = exports.add = void 0;
function add(numbers) {
    var mobile = numbers;
    var count = numbers.length;
    if (count < 8)
        throw new RangeError('number is less than 8 digits: ' + count);
    if (count > 8)
        throw new RangeError('number is more than 8 digits: ' + count);
    return mobile;
}
exports.add = add;
function check(channels) {
    if (channels != 'LINE' && channels != 'Whatsapp' && channels != 'LINE, Whatsapp')
        throw new RangeError('channel not found');
    return channels;
}
exports.check = check;
