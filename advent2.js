var fs = require("fs");
const text = fs.readFileSync("temp.txt", "utf-8");

const split = text.split("\r\n");

let horizontal = 0;
let depth = 0;
let aim = 0;

for (let i = 0; i < split.length; i++) {
    const row = split[i].split(" ");
    const command = row[0];
    const amount = parseInt(row[1]);

    if (command == "forward") {
        horizontal += amount;
		depth += (aim * amount);
    }
    if (command == "up") {
		aim -= amount;
    }
    if (command == "down") {
		aim += amount;
    }
}

console.log(horizontal* depth);
