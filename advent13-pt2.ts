var fs = require("fs");
import _ from "lodash";

module adventday13pt2 {
    let matrix: boolean[][] = [];
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

        for (let y = 0; y < bottomMatrix.length; y++) {
            const columns: boolean[] = bottomMatrix[y];
            columns.forEach((marked, columnIndex) => {
                const topMatrixIndex = topMatrix.length - 1 - y;
                if (topMatrixIndex > -1) {
                    if (topMatrix[topMatrixIndex][columnIndex] === false)
                        topMatrix[topMatrixIndex][columnIndex] = columns[columnIndex];
                }
            });
        }
        return topMatrix;
    }

    const foldLeft = (x: number) => { // 5
        const leftMatrix = [];
        const rightMatrix = [];

        matrix.forEach(row => {
            leftMatrix.push(row.slice(0, x));
            rightMatrix.push(row.slice(x + 1));
        });

        for (let y = 0; y < rightMatrix.length; y++) {
            const columns: boolean[] = rightMatrix[y];
            columns.forEach((marked, columnIndex) => {
                const leftMatrixIndex = leftMatrix[y].length - 1 - columnIndex;
                if (leftMatrixIndex > -1) {
                    if (leftMatrix[y][leftMatrixIndex] === false)
                        leftMatrix[y][leftMatrixIndex] = columns[columnIndex];
                }
            });
        }
        return leftMatrix;
    }

    const instructions = ["fold along x=655",
        "fold along y=447",
        "fold along x=327",
        "fold along y=223",
        "fold along x=163",
        "fold along y=111",
        "fold along x=81",
        "fold along y=55",
        "fold along x=40",
        "fold along y=27",
        "fold along y=13",
        "fold along y=6"
    ]


    instructions.forEach(command => {
        const index = parseInt(command.split("=")[1]);
        if (command.indexOf("x") > -1) {
            matrix = foldLeft(index)
        }
        if (command.indexOf("y") > -1) {
            matrix = foldUp(index)
        }
    });

    console.log(matrix.map(row=> row.map(elem=> elem? "#" : ".").join("")));
}