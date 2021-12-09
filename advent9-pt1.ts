var fs = require("fs");

module adventday9pt1 {
    const matrix = [];
    const text = fs.readFileSync("temp.txt", "utf-8");
    const split = text.split("\r\n");
    split.forEach((row: string, index) => {
        const result = [];
        row.split("").forEach(digit => {
            result.push(parseInt(digit))
        })
        matrix[index] = result;
    });

    const result = [];
    matrix.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            const top = matrix[rowIndex - 1]?.[columnIndex] ?? Number.MAX_SAFE_INTEGER;
            const left = matrix[rowIndex]?.[columnIndex + 1] ?? Number.MAX_SAFE_INTEGER;
            const bottom = matrix[rowIndex + 1]?.[columnIndex] ?? Number.MAX_SAFE_INTEGER;
            const right = matrix[rowIndex]?.[columnIndex - 1] ?? Number.MAX_SAFE_INTEGER;
            if (column < top && column < left && column < bottom && column < right) {
                result.push(column);
            }
        });
    });


    console.log(result.map(r => r + 1).reduce((sum, value) => sum + value));
}