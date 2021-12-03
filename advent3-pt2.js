var fs = require("fs");
const text = fs.readFileSync("temp.txt", "utf-8");

const split = text.split("\r\n");

const result = [];

for (let digitIndex = 0; digitIndex < 12; digitIndex++) {
    let bitZero = 0;
    let bitOne = 0;
    for (let i = 0; i < split.length; i++) {
        const digit = parseInt(split[i].charAt(digitIndex));
        if (digit == 1) {
            bitOne++;
        }
        if (digit == 0) {
            bitZero++;
        }
    }
    if (bitOne > bitZero) {
        result.push(1);
    } else if (bitZero > bitOne) {
        result.push(0);
    } else {
        result.push(2);
    }
    bitZero = 0;
    bitOne = 0;
}

var gamma = parseInt(result.join(""), 2);

var epsilon = parseInt(result.map((r) => (r == 1 ? 0 : 1)).join(""), 2);

console.log(gamma * epsilon);
