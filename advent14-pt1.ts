var fs = require("fs");
import _ from "lodash";

module adventday14pt1 {
    let matrix: boolean[][] = [];
    const text = fs.readFileSync("temp.txt", "utf-8");
    const split: string[] = text.split("\r\n");

    interface IRule {
        firstLetter: string;
        secondLetter: string;
        insertion: string;
    }
    const rules: IRule[] = [];
    split.forEach(row => {
        const value = row.split(" -> ");
        const polymer = value[0].split("");
        rules.push({ firstLetter: polymer[0], secondLetter: polymer[1], insertion: value[1] } as IRule);
    });
    interface IPosition {
        letter: string;
        position: number;
    }

    const occurrences = (string: string, subString: string, allowOverlapping: boolean): number[] => {
        if (subString.length <= 0)
            return [];

        var n = 0,
            pos = 0,
            step = allowOverlapping ? 1 : subString.length;

        const indexes = [];
        while (true) {
            pos = string.indexOf(subString, pos);
            if (pos >= 0) {
                indexes.push(pos);
                ++n;
                pos += step;
            } else break;
        }
        return indexes;
    }

    const applyRules = (input: string): string => {
        const positions: IPosition[] = [];
        rules.forEach(rule => {
            const indexes = occurrences(input, rule.firstLetter + rule.secondLetter, true);
            indexes.forEach(index => {
                positions.push({
                    letter: rule.insertion,
                    position: index + 1
                } as IPosition);
            });
        });

        let result = input.split("");
        positions.sort((a, b) => a.position - b.position).forEach((position, index) => {
            result.splice(position.position + index, 0, position.letter);
        });

        return result.join("");
    }


    let input = "KFVHFSSVNCSNHCPCNPVO";
    for (let index = 1; index <= 10; index++) {
        input = applyRules(input);
    }

    const counts: { [letter: string]: number } = {};
    input.split("").forEach(letter => {
        if (counts[letter]) counts[letter]++;
        else counts[letter] = 1;
    });

    const values = Object.values(counts);
    const max = Math.max(...values);
    const min = Math.min(...values);

    console.log(max - min);
}