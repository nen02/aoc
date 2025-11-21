import { readTextFile } from "../utils.ts";

function findChecksum(data: number[][]): number {
  let res = 0;

  for (const row of data) {
    let min = Infinity;
    let max = 0;

    for (const num of row) {
      min = Math.min(num, min);
      max = Math.max(num, max);
    }

    res += max - min;
  }

  return res;
}

function findChecksum2(data: number[][]): number {
  let res = 0;

  for (const row of data) {
    for (let i = 0; i < row.length; i++) {
      for (let j = i + 1; j < row.length; j++) {
        if (row[i] % row[j] === 0) res += row[i] / row[j];
        else if (row[j] % row[i] === 0) res += row[j] / row[i];
      }
    }
  }

  return res;
}

const input = await readTextFile("./2017/assets/day2.txt");
const data = input.split("\n").map((row) => row.split("\t").map(Number));
console.log(data);

const p1 = findChecksum(data);
console.log(p1);

const p2 = findChecksum2(data);
console.log(p2);
