var fs = require("fs");

module adventday10pt2 {
    const text = fs.readFileSync("temp.txt", "utf-8");
    const split = text.split("\r\n");

    const bracketsDict = {
        "(": ")",
        "[": "]",
        "{": "}",
        "<": ">"
    }

    const points = {
        ")": 1,
        "]": 2,
        "}": 3,
        ">": 4
    }

    function findClosingBracketMatchIndex(str: string, bracket: string, pos: number) {
        if (str[pos] != bracket) {
            return -1;
        }
        let depth = 1;
        for (let i = pos + 1; i < str.length; i++) {
            switch (str[i]) {
                case bracket:
                    depth++;
                    break;
                case bracketsDict[bracket]:
                    if (--depth == 0) {
                        return i;
                    }
                    break;
            }
        }
        return -1;    // No matching closing parenthesis
    }

    const getCorruptPositions = (row: string): string[] => {
        const characters = row.split("");
        const openingBrackets = [];
        const invalidPositions = [];
        for (let index = 0; index < characters.length; index++) {
            const bracket = characters[index];
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
        }

        return invalidPositions;
    }



    const incomplete = [];

    split.forEach((row: string) => {
        const invalidPositions = getCorruptPositions(row);
        if (invalidPositions.length < 1) {
            incomplete.push(row);
        }
    });

    const isComplete = (row: string) => {
        return row.split("").filter(b => bracketsDict[b]).every((bracket, index) => findClosingBracketMatchIndex(row, bracket, index) > -1);
    }

    const calculatePoints = (input: string[]) => {
        let totalPoints = 0;
        input.map(bracket => points[bracket] ?? 0).forEach(points => {
            totalPoints *= 5;
            totalPoints += points;
        });
        return totalPoints;
    }


    const getPontsForRow = (row: string) => {
        let addedBrackets = [];
        while (!isComplete(row)) {
            if (Object.values(bracketsDict).every(bracket => getCorruptPositions(row + bracket).length > 0)) {
                break;
            }

            for (let index = 0; index < Object.values(bracketsDict).length; index++) {
                const element = Object.values(bracketsDict)[index];
                if (getCorruptPositions(row + element).length > 0) {
                    continue;
                }
                row += element;
                addedBrackets.push(element);
            }
        }
        return calculatePoints(addedBrackets);
    }


    const allPoints: number[] = [];
    incomplete.forEach(row => {
        allPoints.push(getPontsForRow(row));
    });

    console.log(allPoints.sort((a, b) => a - b)[Math.floor(allPoints.length / 2)]);
}