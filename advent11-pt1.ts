var fs = require("fs");

module adventday9pt1 {
    const matrix: IColumn[][] = [];
    const text = fs.readFileSync("temp.txt", "utf-8");
    const split = text.split("\r\n");

    interface IColumn {
        value: number;
        flashed: boolean;
    }
    split.forEach((row: string, index) => {
        const result: IColumn[] = [];
        row.split("").forEach(digit => {
            result.push({ value: parseInt(digit), flashed: false } as IColumn)
        })
        matrix[index] = result;
    });


    let flashCount = 0;
    const checkForFlash = (rowIndex: number, columnIndex: number) => {
        if (matrix[rowIndex]?.[columnIndex].value > 9 && matrix[rowIndex]?.[columnIndex].flashed === false) {
            matrix[rowIndex][columnIndex].flashed = true;
            flashCount++;

            if (matrix[rowIndex - 1]?.[columnIndex]) {
                matrix[rowIndex - 1][columnIndex].value++;
                checkForFlash(rowIndex - 1, columnIndex);
            }
            if (matrix[rowIndex]?.[columnIndex + 1]) {
                matrix[rowIndex][columnIndex + 1].value++;
                checkForFlash(rowIndex, columnIndex + 1);
            }
            if (matrix[rowIndex + 1]?.[columnIndex]) {
                matrix[rowIndex + 1][columnIndex].value++
                checkForFlash(rowIndex + 1, columnIndex);
            }
            if (matrix[rowIndex]?.[columnIndex - 1]) {
                matrix[rowIndex][columnIndex - 1].value++
                checkForFlash(rowIndex, columnIndex - 1);
            }
            if (matrix[rowIndex - 1]?.[columnIndex + 1]) {
                matrix[rowIndex - 1][columnIndex + 1].value++
                checkForFlash(rowIndex - 1, columnIndex + 1);
            }
            if (matrix[rowIndex - 1]?.[columnIndex - 1]) {
                matrix[rowIndex - 1][columnIndex - 1].value++
                checkForFlash(rowIndex - 1, columnIndex - 1);
            }
            if (matrix[rowIndex + 1]?.[columnIndex + 1]) {
                matrix[rowIndex + 1][columnIndex + 1].value++
                checkForFlash(rowIndex + 1, columnIndex + 1);
            }
            if (matrix[rowIndex + 1]?.[columnIndex - 1]) {
                matrix[rowIndex + 1][columnIndex - 1].value++
                checkForFlash(rowIndex + 1, columnIndex - 1);
            }
        }
    }

    for (let index = 1; index <= 100; index++) {
        matrix.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                if (matrix[rowIndex]?.[columnIndex]) {
                    matrix[rowIndex][columnIndex].value++;
                }
            });
        });
        matrix.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                if (matrix[rowIndex]?.[columnIndex]) {
                    checkForFlash(rowIndex, columnIndex);
                }
            });
        });

        matrix.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                if (matrix[rowIndex]?.[columnIndex].value > 9) {
                    matrix[rowIndex][columnIndex].value = 0;
                    matrix[rowIndex][columnIndex].flashed = false;
                }
            });
        });
    }

    console.log(flashCount);
}