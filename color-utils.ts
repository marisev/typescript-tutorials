export function hexToRgb(hex: string): {r: number, g: number, b: number} {
    // ff0000
    // f00

    // the sequence of three 2-char-subtrings in the hex color system represent hexadecimal numbers of red, green, blue
    // in order to convert hex-color to rgb-color we need to get a decimal number from each hexadecimal part.
    if (hex.length === 3) {
        let r = hex[0];
        let g = hex[1];
        let b = hex[2];
        return hexToRgb(`${r}${r}${g}${g}${b}${b}`);
    }
    // array destructuring
    let [r, g, b] = [0, 2, 4]
        // split hex string into three 2-char strings
        .map(offset => hex.substring(offset, offset+2)) // ['ff', '00', '00']
        // get a numeric representation for each string, with the base=16 (default base = 10 is decimal numeral system, 16 - is hexadecimal)
        .map(hexCh => parseInt(hexCh, 16)); // [255, 0, 0]
    
    return {r, g, b}; // {r: 255, g: 0, b: 0}
}

export function rgbToHex(r: number, g: number, b: number): string {
    return [r, g, b]
        // to treat outbound inputs, box the number in between 0-255
        // convert number to its string representation with base=16
        .map(decCh => Math.max(0, Math.min(decCh, 255)).toString(16))
        .map(hexCh => hexCh.length === 1 ? `0${hexCh}` : hexCh)
        .join('');
}

console.log('rgbToHex(255, 0, 0) --> "ff0000": ', rgbToHex(255, 0, 0));
console.log('rgbToHex(255, 255, 255) --> "ffffff": ', rgbToHex(255, 255, 255));
console.log('hexToRgb("ff0000") -> {r: 255, g: 0, b: 0}: ', hexToRgb('ff0000'));
console.log('hexToRgb("f00") -> {r: 255, g: 0, b: 0}: ', hexToRgb('f00'));
console.log('rgbToHex(255, 255, 255).toLowerCase() -> "ffffff": ', rgbToHex(255, 255, 255).toLowerCase());
console.log('rgbToHex(100, 100, -30).toLowerCase() -> "646400": ', rgbToHex(100, 100, -30).toLowerCase());

let y: never;
console.log(typeof y); // undefined