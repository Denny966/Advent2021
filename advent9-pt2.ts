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

    interface ICoord {
        x: number,
        y: number
    }
    const lowestCoords: ICoord[] = [];
    matrix.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            const top = matrix[rowIndex - 1]?.[columnIndex] ?? Number.MAX_SAFE_INTEGER;
            const left = matrix[rowIndex]?.[columnIndex - 1] ?? Number.MAX_SAFE_INTEGER;
            const bottom = matrix[rowIndex + 1]?.[columnIndex] ?? Number.MAX_SAFE_INTEGER;
            const right = matrix[rowIndex]?.[columnIndex + 1] ?? Number.MAX_SAFE_INTEGER;
            if (column < top && column < left && column < bottom && column < right) {
                lowestCoords.push({ x: columnIndex, y: rowIndex });
            }
        });
    });

    const getBasin = (coord: ICoord, result: ICoord[]) => {
        let current = matrix[coord.y]?.[coord.x];

        const rightCoord = { x: coord.x + 1, y: coord.y } as ICoord;
        const right = matrix[rightCoord.y]?.[rightCoord.x] ?? 9;
        if (right > current && right !== 9) {
            result.push(rightCoord);
            getBasin(rightCoord, result);
        }

        const leftCoord = { x: coord.x - 1, y: coord.y } as ICoord;
        const left = matrix[leftCoord.y]?.[leftCoord.x] ?? 9;
        if (left > current && left !== 9) {
            result.push(leftCoord);
            getBasin(leftCoord, result);
        }

        const topCoord = { x: coord.x, y: coord.y - 1 } as ICoord;
        const top = matrix[topCoord.y]?.[topCoord.x] ?? 9;
        if (top > current && top !== 9) {
            result.push(topCoord);
            getBasin(topCoord, result);
        }

        const bottomCoord = { x: coord.x, y: coord.y + 1 } as ICoord;
        const bottom = matrix[bottomCoord.y]?.[bottomCoord.x] ?? 9;
        if (bottom > current && bottom !== 9) {
            result.push(bottomCoord);
            getBasin(bottomCoord, result);
        }

        result.push(coord);
        return result;
    }

    const sizes = [];
    lowestCoords.forEach(lowestCoord => {
        const basin = getBasin(lowestCoord, []).filter((coord, index, self) => self.findIndex(coord2 => coord.x === coord2.x && coord.y === coord2.y) === index);
        sizes.push(basin.length);
    });

    console.log(sizes.sort((a, b) => b - a).slice(0, 3).reduce((sum, value) => sum * value, 1))
}