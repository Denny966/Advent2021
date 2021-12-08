var fs = require("fs");

module adventday8pt1 {
    const dict = {

        2: 1,
        4: 4,
        3: 7,
        7: 8
    }

    const text: string = fs.readFileSync("temp.txt", "utf-8");

    const split = text.split("\r\n");

    let total = [];
    split.forEach(row => {
        const display = row.split(" | ")[1];
        const output = display.split(" ").filter(o => dict[o.length])

        total = total.concat(output);
    });

    console.log(total.length);
}