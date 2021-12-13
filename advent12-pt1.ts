var fs = require("fs");
import _ from "lodash";

module adventday12pt1 {
    const text = fs.readFileSync("temp.txt", "utf-8");
    const split: string[] = text.split("\r\n");

    interface ICave {
        name: string;
        small: boolean;
    }

    let allCaves: ICave[][] = [];

    function Graph(caves: ICave[]) {
        allCaves = new Array(caves.length);
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


    const visitedCaves: { [named: string]: boolean } = {
        "start": true,
        "end": true
    };

    const nodeAvailable = (node: ICave) => {
        return (node.small && !visitedCaves[node.name]) || !node.small;
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
                visitedCaves[nextCave.name] = true;
                connectionPath.push(nextCave);
                findRoutes(nextCave, targetCave);
                connectionPath.pop();
                visitedCaves[nextCave.name] = false;
            }
        }
    }

    findRoutes({ name: "start", small: true } as ICave, { name: "end", small: true } as ICave);
    //console.log(allCaves)

    console.log(connectionPaths.map(paths => paths.map(p => p.name)));
    console.log(connectionPaths.length);
}