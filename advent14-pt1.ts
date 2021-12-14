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

    interface IBase {
        letter: string;
        inserted: boolean;
    }


    const basePolymer: IBase[] = "NNCB".split("").map(letter => ({ letter, inserted: false }) as IBase);

    const applyRules = () => {
        rules.forEach(rule => {
            const firstLetterIndex = basePolymer.findIndex(polymer => polymer.letter == rule.firstLetter && !polymer.inserted);
            const secondLetterIndex = basePolymer.findIndex((polymer, index) => polymer.letter == rule.secondLetter && !polymer.inserted && index > firstLetterIndex);
console.log(firstLetterIndex, secondLetterIndex)
            if (secondLetterIndex === firstLetterIndex + 1) {
                basePolymer.splice(secondLetterIndex, 0, { letter: rule.insertion, inserted: true } as IBase);
            }
        });
        basePolymer.forEach(polymer => {
            polymer.inserted = false;
        })
    }

    applyRules();

    console.log(basePolymer.map(polymer => polymer.letter).join(""))

}