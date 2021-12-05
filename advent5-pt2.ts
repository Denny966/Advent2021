var fs = require("fs");
namespace advent5_pt2 {
    const text = fs.readFileSync("temp.txt", "utf-8");

    const split = text.split("\r\n");


    interface ICoordOverlap {
        x: number, overlapCount: number
    }
    const grid: ICoordOverlap[][] = [];
    for (let i = 0; i < 1000; i++) {
        let row: ICoordOverlap[] = [];
        for (let j = 0; j < 1000; j++) {
            row.push({ x: j, overlapCount: 0 });
        }
        grid.push(row);
    }
    interface ICoord {
        x: number;
        y: number;
    }
    const coordsCovered = (x1, y1, x2, y2) => {
        var coordinatesArray: ICoord[] = [];
        // Translate coordinates

        // Define differences and error check
        var dx = Math.abs(x2 - x1);
        var dy = Math.abs(y2 - y1);
        var sx = (x1 < x2) ? 1 : -1;
        var sy = (y1 < y2) ? 1 : -1;
        var err = dx - dy;
        // Set first coordinates
        coordinatesArray.push({ x: x1, y: y1 } as ICoord);
        // Main loop
        while (!((x1 == x2) && (y1 == y2))) {
            var e2 = err << 1;
            if (e2 > -dy) {
                err -= dy;
                x1 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y1 += sy;
            }
            // Set coordinates
            coordinatesArray.push({ x: x1, y: y1 } as ICoord);
        }
        // Return the result
        return coordinatesArray;
    }

    split.forEach(line => {
        const text = line.split(" -> ");
        const from = text[0].split(",");
        const to = text[1].split(",");

        const x1 = parseInt(from[0]);
        const y1 = parseInt(from[1]);

        const x2 = parseInt(to[0]);
        const y2 = parseInt(to[1]);
        const points = coordsCovered(x1, y1, x2, y2);
        points.forEach(point => {
            grid[point.y][point.x].overlapCount++;
        });
    });

    let dangerZoneCount = 0;
    grid.forEach(row => {
        dangerZoneCount += row.filter(r => r.overlapCount > 1).length;
    });

    console.log(dangerZoneCount)
}