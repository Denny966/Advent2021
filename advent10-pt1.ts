var fs = require("fs");

module adventday9pt1 {
    const matrix = [];
    const text = fs.readFileSync("temp.txt", "utf-8");
    const split = text.split("\r\n");

    const bracketsDict = {
        "(": ")",
        "[": "]",
        "{": "}",
        "<": ">"
    }

    const points = {
        ")": 3,
        "]": 57,
        "}": 1197,
        ">": 25137
    }
    const totalInvalid = [];

    split.forEach((row: string) => {
        const openingBrackets = [];
        const invalidPositions = [];
        row.split("").forEach((bracket) => {
            const isOpeningBracket = bracketsDict[bracket];
            if (isOpeningBracket) {
                openingBrackets.push(bracket);
            }
            else {
                const openingBracket = Object.keys(bracketsDict).find(key => bracketsDict[key] === bracket);
                if (openingBrackets[openingBrackets.length - 1] === openingBracket) {
                    openingBrackets.pop();
                }
                else {
                    invalidPositions.push(bracket)
                }
            }

        });
        if (invalidPositions.length > 0) {
            totalInvalid.push(invalidPositions[0]);
        }
    });

    console.log(totalInvalid.map(bracket => points[bracket]).reduce((sum, value) => sum + value, 0));
}