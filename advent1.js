var fs = require("fs");
const text = fs.readFileSync("temp.txt", "utf-8");
var stream = fs.createWriteStream("output.txt", {flags:'a'});

const split = text.split("\r\n");

let counter = 0;
let previous = 10000;
for (let i = 0; i < split.length; i++) {
	let number = 0;
	try {
		 number = parseInt(split[i]) + parseInt(split[i + 1]) + parseInt(split[i + 2]);
		if (number > previous){
			counter++;
		}
	}
	catch {
		number = 0;
	}
	previous = number;
}
console.log(counter);