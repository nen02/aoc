import { readTextFile } from "../utils.ts";

function solution1(data: number[][]): number {
    let res = 0;

    for (const [from, to] of data) {
        for (let i = from; i <= to; i++) {
            const str = i.toString();
            const len = str.length;

            if (len % 2 !== 0) continue;
            if (str.slice(0, len / 2) === str.slice(len / 2)) res += i;
        }
    }

    return res;
}

function solution2(data: number[][]): number {
    let res = 0;

    for (const [from, to] of data) {
        for (let i = from; i <= to; i++) {
            const str = i.toString();
            const len = str.length;

            for (let j = 1; j <= len / 2; j++) {
                if (len % j !== 0) continue;

                const repeat = str.slice(0, j);
                let match = true;

                for (let k = 1; k < len / j; k++) {
                    if (str.slice(k * j, (k + 1) * j) !== repeat) {
                        match = false;
                        break;
                    }
                }

                if (match) {
                    res += i;
                    break;
                }
            }
        }
    }

    return res;
}

const input = await readTextFile("./2025/assets/day2.txt");
const data = input.split(",").map((row) => {
    const arr = row.split("-");
    return [Number(arr[0]), Number(arr[1])];
});

const p1 = solution1(data);
console.log(p1);

const p2 = solution2(data);
console.log(p2);
