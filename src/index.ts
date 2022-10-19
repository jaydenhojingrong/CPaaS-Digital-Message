export function add(numbers: string){
    let mobile = numbers;
    let count = numbers.length;
 
    if (count < 8)
        throw new RangeError('number is less than 8 digits: ' + count);
    if (count > 8)
        throw new RangeError('number is more than 8 digits: ' + count);

    return mobile;

}
export function check(channels: string){
 
    if (channels != 'LINE' && channels != 'Whatsapp' && channels != 'LINE, Whatsapp')
        throw new RangeError('channel not found');

    return channels;

}
 