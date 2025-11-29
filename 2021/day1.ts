import { readTextFile } from "../utils.ts";

function countLargerThenPrevious(data: number[]): number {
  let count = 0;
  for (let i = 1; i < data.length; i++) {
    if (data[i] > data[i - 1]) count++;
  }
  return count;
}

function countLargerThenPrevious2(data: number[]): number {
  const sums: number[] = [];
  for (let i = 2; i < data.length; i++) {
    sums.push(data[i] + data[i - 1] + data[i - 2]);
  }

  let count = 0;
  for (let i = 1; i < sums.length; i++) {
    if (sums[i] > sums[i - 1]) count++;
  }
  return count;
}

const input = await readTextFile("./2021/assets/day1.txt");
const data = input.split("\n").map(Number);

const p1 = countLargerThenPrevious(data);
console.log(p1);

const p2 = countLargerThenPrevious2(data);
console.log(p2);
