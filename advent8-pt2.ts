var fs = require("fs");

module adventday8pt2v2 {


    const segments = {
        0: {
            a: true,
            b: true,
            c: true,
            d: false,
            e: true,
            f: true,
            g: true
        },
        1: {
            a: false,
            b: false,
            c: true,
            d: false,
            e: false,
            f: true,
            g: false
        }, 2: {
            a: true,
            b: false,
            c: true,
            d: true,
            e: true,
            f: false,
            g: true
        }, 3: {
            a: true,
            b: false,
            c: true,
            d: true,
            e: false,
            f: true,
            g: true
        },
        4: {
            a: false,
            b: true,
            c: true,
            d: true,
            e: false,
            f: true,
            g: false
        }, 5: {
            a: true,
            b: true,
            c: false,
            d: true,
            e: false,
            f: true,
            g: true
        }
        , 6: {
            a: true,
            b: true,
            c: false,
            d: true,
            e: true,
            f: true,
            g: true
        },
        7: {
            a: true,
            b: false,
            c: true,
            d: false,
            e: false,
            f: true,
            g: false
        },
        8: {
            a: true,
            b: true,
            c: true,
            d: true,
            e: true,
            f: true,
            g: true
        },
        9: {
            a: true,
            b: true,
            c: true,
            d: true,
            e: false,
            f: true,
            g: true
        }
    }

    const text: string = fs.readFileSync("temp.txt", "utf-8");

    const split = text.split("\r\n");

    const getKeyByValue = (object, value) => {
        return Object.keys(object).find(key => object[key] === value);
    }

    const permute = (permutation: any[]) => {
        var length = permutation.length,
            result = [permutation.slice()],
            c = new Array(length).fill(0),
            i = 1, k, p;

        while (i < length) {
            if (c[i] < i) {
                k = i % 2 && c[i];
                p = permutation[i];
                permutation[i] = permutation[k];
                permutation[k] = p;
                ++c[i];
                i = 1;
                result.push(permutation.slice());
            } else {
                c[i] = 0;
                ++i;
            }
        }
        return result;
    }

    const possibilities: string[][] = permute(["a", "b", "c", "d", "e", "f", "g"]);

    const keys = ["a", "b", "c", "d", "e", "f", "g"];
    const allsegments = [];
    for (let index = 0; index < possibilities.length; index++) {
        const element = possibilities[index];
        const segment = {}
        element.forEach((e, i) => {
            segment[keys[i]] = e;
        })
        allsegments.push(segment);

    }

    const getDigitInSegment = (segment: { position: string, wire: string }, combination: string) => {
        const resultSegment = {
            a: false,
            b: false,
            c: false,
            d: false,
            e: false,
            f: false,
            g: false
        }

        combination.split("").forEach(letter => {
            const key = getKeyByValue(segment, letter);
            resultSegment[key] = true;
        });
        const digit = Object.keys(segments).find(key => Object.keys(segments[key]).every(segmentKey => segments[key][segmentKey] === resultSegment[segmentKey]));
        return digit;
    }

    let totalOutput = 0;
    split.forEach(row => {
        const display = row.split(" | ")[0];
        const combinations = display.split(" ");
        let resultSegment;
        for (let index = 0; index < allsegments.length; index++) {
            const segment = allsegments[index];
            if (combinations.every(combination => getDigitInSegment(segment, combination) != null)) {
                resultSegment = segment;
                break;
            }
        }

        const output: string[] = row.split(" | ")[1].split(" ");
        const result = [];
        output.forEach(letters => {
            result.push(getDigitInSegment(resultSegment, letters));
        });
        totalOutput += parseInt(result.join(""));
    });

    console.log(totalOutput);
}