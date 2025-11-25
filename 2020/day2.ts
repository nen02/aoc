import { readTextFile } from "../utils.ts";

function countValidPwrds(data: [string[], string][]): number {
    let count = 0;

    for (const row of data) {
        const [[min, max, chr], str] = row;

        let chrCount = 0;
        for (const strChr of str) {
            if (strChr === chr) chrCount++;
        }

        if (chrCount <= Number(max) && chrCount >= Number(min)) count++;
    }

    return count;
}

function countValidPwrds2(data: [string[], string][]): number {
    let count = 0;

    for (const row of data) {
        const [[idx1, idx2, chr], str] = row;

        let chrCount = 0;
        if (str[Number(idx1) - 1] === chr) chrCount++;
        if (str[Number(idx2) - 1] === chr) chrCount++;

        if (chrCount === 1) count++;
    }

    return count;
}

const input = await readTextFile("./2020/assets/day2.txt");
const data = input.split("\r").map((row) => {
    const rowArr = row.trim().split(": ");
    return [rowArr[0].split(/[-\s]/), rowArr[1]];
});

const p1 = countValidPwrds(data);
console.log(p1);

const p2 = countValidPwrds2(data);
console.log(p2);
