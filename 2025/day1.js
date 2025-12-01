import { readTextFile } from "../utils.ts";

function solution1(data) {
    let res = 0;

    let curr = 50;
    for (const row of data) {
        const dir = row[0];
        const count = Number(row.slice(1));

        if (dir === "L") {
            curr = (curr - count + 100) % 100;
        } else {
            curr = (curr + count) % 100;
        }

        if (curr === 0) res++;
    }

    return res;
}

function countZero(start, dir, count) {
    let zeroCount = 0;
    let curr = start;

    if (dir === "L") {
        for (let i = 0; i < count; i++) {
            curr--;
            if (curr < 0) {
                curr = 99;
            }
            if (curr === 0) {
                zeroCount++;
            }
        }
    } else {
        for (let i = 0; i < count; i++) {
            curr++;
            if (curr > 99) {
                curr = 0;
            }
            if (curr === 0) {
                zeroCount++;
            }
        }
    }

    return { zeroCount, curr };
}

function solution2(data) {
    let res = 0;

    let curr = 50;
    for (const row of data) {
        const dir = row[0];
        const count = Number(row.slice(1));

        const result = countZero(curr, dir, count);
        res += result.zeroCount;
        curr = result.curr;
    }

    return res;
}

const input = await readTextFile("./2025/assets/day1.txt");
const data = input.split("\n");

const p1 = solution1(data);
console.log(p1);

const p2 = solution2(data);
console.log(p2);
