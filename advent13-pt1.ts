var fs = require("fs");

module adventday13pt1 {
    const matrix: boolean[][] = [];
    const text = fs.readFileSync("temp.txt", "utf-8");
    const split = text.split("\r\n");

    interface ICoord {
        x: number;
        y: number;
    }

    const coords: ICoord[] = [];
    const xs = [];
    const ys = [];
    split.forEach((row: string, index) => {
        const numbers = row.split(",");
        const x = parseInt(numbers[0]);
        const y = parseInt(numbers[1]);
        xs.push(x);
        ys.push(y);
        coords.push({ x, y } as ICoord);
    });

    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);

    for (let y = 0; y <= maxY; y++) {
        matrix[y] = []
        for (let x = 0; x <= maxX; x++) {
            matrix[y].push(coords.find(coord => coord.x === x && coord.y === y) != null);
        }
    }


    const foldUp = (y: number) => { //7
        const topMatrix = matrix.slice(0, y);
        const bottomMatrix = matrix.slice(y + 1);

        for (let y = 0; y <= bottomMatrix.length; y++) {
            const columns: boolean[] = bottomMatrix[y];
            columns.forEach((marked, index) => {
                if (topMatrix[topMatrix.length - 1 - y])
                    topMatrix[topMatrix.length - 1 - y][index] = columns[index];
            });
        }
    }

    //console.log(matrix);
    console.log(foldUp(7))
}