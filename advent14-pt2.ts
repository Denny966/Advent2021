var fs = require("fs");
import _ from "lodash";

module adventday14pt2 {
    const text = fs.readFileSync("temp.txt", "utf-8");
    const split: string[] = text.split("\r\n");
    const rules: Map<string, string> = new Map();;

    split.forEach(row => {
        const value = row.split(" -> ");
        rules.set(value[0], value[1]);
    });


    let polymer = "KFVHFSSVNCSNHCPCNPVO";

    let pairCount: Map<string, number> = new Map();

    for (let i = 0; i < polymer.length - 1; i++) {
        const part = polymer.substr(i, 2);
        pairCount.set(part, (pairCount.get(part) ?? 0) + 1)
    }

    const step = (steps: number) => {
        let letterCount = _.countBy(polymer)
        for (let i = 1; i <= steps; i++) {
            let pairCountTemp: Map<string, number> = new Map();
            for (let [pair, count] of pairCount) {
                const letter = rules.get(pair);
                const firstNewPair = pair[0] + letter;
                const secondNewPair = letter + pair[1];
                pairCountTemp.set(firstNewPair, (pairCountTemp.get(firstNewPair) ?? 0) + count);
                pairCountTemp.set(secondNewPair, (pairCountTemp.get(secondNewPair) ?? 0) + count);
                letterCount[letter] = (letterCount[letter] ?? 0) + count;
            }
            pairCount = pairCountTemp;
        }
        return (Math.max(...Object.values(letterCount)) - Math.min(...Object.values(letterCount)))
    }

    console.log(step(40));
}