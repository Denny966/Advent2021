var fs = require("fs");
import _ from "lodash";

module adventday12pt2 {
    const text = fs.readFileSync("temp.txt", "utf-8");
    const split: string[] = text.split("\r\n");

    interface ICave {
        name: string;
        small: boolean;
    }

    let allCaves: { [name: string]: ICave[] } = {};

    function Graph(caves: ICave[]) {
        caves.forEach(cave => {
            allCaves[cave.name] = [];
        });
    }

    function addEdge(fromCave: string, toCave: ICave) {
        const caves: ICave[] = allCaves[fromCave];
        if (!caves.some(c => c.name === toCave.name)) {
            caves.push(toCave);
        }
    }

    let caves: ICave[] = [];

    split.forEach(row => {
        let temp = row.split("-");
        const fromCave = { name: temp[0], small: temp[0] !== temp[0].toUpperCase() } as ICave;
        const toCave = { name: temp[1], small: temp[1] !== temp[1].toUpperCase() } as ICave;
        caves.push(fromCave);
        caves.push(toCave);
    });

    caves = _.uniqBy(caves, c => c.name);
    // Driver Code
    Graph(caves);

    split.forEach(row => {
        let temp = row.split("-");
        const fromCave = { name: temp[0], small: temp[0] !== temp[0].toUpperCase() } as ICave;
        const toCave = { name: temp[1], small: temp[1] !== temp[1].toUpperCase() } as ICave;
        addEdge(fromCave.name, toCave);
        addEdge(toCave.name, fromCave);
    });


    const visitedCaves: { [named: string]: number } = {
        "start": 2,
        "end": 2
    };

    const nodeAvailable = (node: ICave) => {
        if (node.small) {
            const smallCaveVisits = Object.keys(visitedCaves).filter(caveName => !["start", "end"].includes(caveName)).filter(caveName => caveName === caveName.toLowerCase());
            const anySmallCaveVisitedTwice = smallCaveVisits.map(caveName => visitedCaves[caveName]).some(visitCount => visitCount > 1);
            const limit = anySmallCaveVisitedTwice ? 1 : 2;
            return (visitedCaves[node.name] ?? 0) < limit;
        }
        return true;
    }

    const connectionPath: ICave[] = [];
    const connectionPaths: ICave[][] = [];

    const findRoutes = (cave: ICave, targetCave: ICave) => {
        const nextCaves: ICave[] = allCaves[cave.name];

        for (let index = 0; index < nextCaves.length; index++) {
            const nextCave = nextCaves[index];
            if (nextCave.name === targetCave.name) {
                const temp = [];
                connectionPath.forEach(path => {
                    temp.push(path);
                });
                connectionPaths.push(temp);
            }

            else if (nodeAvailable(nextCave)) {
                visitedCaves[nextCave.name] = (visitedCaves[nextCave.name] ?? 0) + 1;
                connectionPath.push(nextCave);
                findRoutes(nextCave, targetCave);
                connectionPath.pop();
                visitedCaves[nextCave.name] = (visitedCaves[nextCave.name] ?? 0) - 1;
            }
        }
    }

    findRoutes({ name: "start", small: true } as ICave, { name: "end", small: true } as ICave);

    console.log(connectionPaths.map(paths => paths.map(p => p.name).join(",")));
    console.log(connectionPaths.length);
}