var fs = require("fs");
const text = fs.readFileSync("temp.txt", "utf-8");

const split = text.split("\r\n");

let result = split.map((s) => s);

for (let digitIndex = 0; digitIndex < 12; digitIndex++) {
    let bitZero = 0;
    let bitOne = 0;
    for (let i = 0; i < result.length; i++) {
        const digit = parseInt(result[i].charAt(digitIndex));
        if (digit == 1) {
            bitOne++;
        }
        if (digit == 0) {
            bitZero++;
        }
    }
    if (bitZero > bitOne) {
        result = result.filter((row) => parseInt(row.charAt(digitIndex)) == 0);
    } else {
        result = result.filter((row) => parseInt(row.charAt(digitIndex)) == 1);
    }
    if (result.length === 1) {
        break;
    }
}

const generatorRating = parseInt(result, 2);

result = split.map((s) => s);

for (let digitIndex = 0; digitIndex < 12; digitIndex++) {
    let bitZero = 0;
    let bitOne = 0;
    for (let i = 0; i < result.length; i++) {
        const digit = parseInt(result[i].charAt(digitIndex));
        if (digit == 1) {
            bitOne++;
        }
        if (digit == 0) {
            bitZero++;
        }
    }
    if (bitOne < bitZero) {
        result = result.filter((row) => parseInt(row.charAt(digitIndex)) == 1);
    } else {
        result = result.filter((row) => parseInt(row.charAt(digitIndex)) == 0);
    }
    if (result.length === 1) {
        break;
    }
}

const scrubberRating = parseInt(result, 2);

console.log(generatorRating * scrubberRating);