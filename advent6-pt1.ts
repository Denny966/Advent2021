var fs = require("fs");

module adventday6pt1 {
    const input = [5, 1, 1, 4, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 2, 1, 1, 1, 3, 5, 1, 1, 1, 5, 4, 1, 1, 1, 2, 2, 1, 1, 1, 2, 1, 1, 1, 2, 5, 2, 1, 2, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 4, 1, 1, 1, 5, 4, 1, 1, 3, 3, 2, 1, 1, 1, 5, 1, 1, 4, 1, 1, 5, 1, 1, 5, 1, 2, 3, 1, 5, 1, 3, 2, 1, 3, 1, 1, 4, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 1, 4, 4, 1, 5, 1, 1, 3, 5, 1, 1, 5, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 5, 1, 1, 1, 1, 4, 1, 1, 1, 1, 4, 1, 1, 1, 1, 3, 1, 2, 1, 2, 1, 3, 1, 3, 4, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 2, 2, 1, 2, 4, 1, 1, 3, 1, 1, 1, 5, 1, 3, 1, 1, 1, 5, 5, 1, 1, 1, 1, 2, 3, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 4, 3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 2, 2, 1, 4, 1, 5, 1, 5, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 4, 3, 1, 1, 4];
    const newFishStartCycle = 8;
    const fishStartCycle = 6;

    interface ILanternFish {
        cycle: number,
        createdNewFish: boolean;
    }

    const fishes: ILanternFish[] = input.map(i => ({ cycle: i, createdNewFish: false }) as ILanternFish);

    const cycle = (fishes: ILanternFish[]) => {
        const newOutput: ILanternFish[] = [];
        let newFishes = 0;
        fishes.forEach(fish => {
            fish.cycle--;
            if (fish.cycle === -1) {
                newOutput.push(({ cycle: fishStartCycle, createdNewFish: true }) as ILanternFish);
                if (!fish.createdNewFish) {
                    fish.createdNewFish = true;
                    newFishes++;
                }
            }
            else {
                newOutput.push(({ cycle: fish.cycle, createdNewFish: false }));
            }
        });

        for (let i = 0; i < newFishes; i++) {
            newOutput.push(({ cycle: newFishStartCycle, createdNewFish: false }));
        }

        return newOutput;
    }

    let fishesAfterDay = fishes.map(f => f);
    for (let day = 1; day <= 80; day++) {
        fishesAfterDay = cycle(fishesAfterDay);
    }

    console.log(fishesAfterDay.length);
}