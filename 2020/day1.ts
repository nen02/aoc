import { readTextFile } from "../utils.ts";

function findEntries(data: number[]): number {
    for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
            if (data[i] + data[j] === 2020) return data[i] * data[j];
        }
    }

    return 0;
}

function findThreeEntries(data: number[]): number {
    for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
            for (let k = i + 2; k < data.length; k++) {
                if (data[i] + data[j] + data[k] === 2020)
                    return data[i] * data[j] * data[k];
            }
        }
    }

    return 0;
}

const input = await readTextFile("./2020/assets/day1.txt");
const data = input.split("\n").map(Number);

const p1 = findEntries(data);
console.log(p1);

const p2 = findThreeEntries(data);
console.log(p2);
