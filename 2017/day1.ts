import { readTextFile } from "../utils.ts";

function findSumThatMatchTheNextDigit(data: string): number {
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i] === data[(i + 1) % data.length]) sum += Number(data[i]);
  }

  return sum;
}

function findSumThatMatchHalf(data: string): number {
  const half = data.length / 2;
  let sum = 0;

  for (let i = 0; i < half; i++) {
    if (data[i] === data[half + i]) sum += Number(data[i]) * 2;
  }

  return sum;
}

const input = await readTextFile("./2017/assets/day1.txt");
const p1 = findSumThatMatchTheNextDigit(input);
console.log(p1);

const p2 = findSumThatMatchHalf(input);
console.log(p2);
