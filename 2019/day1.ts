import { readTextFile } from "../utils.ts";

function sumOfFuel(data: number[]): number {
  return data.reduce((a, c) => {
    return a + Math.floor(c / 3) - 2;
  }, 0);
}

function sumOfFuel2(data: number[]): number {
  return data.reduce((a, c) => {
    let total = 0;

    while (true) {
      c = Math.floor(c / 3) - 2;
      if (c <= 0) break;
      total += c;
    }

    return a + total;
  }, 0);
}

const input = await readTextFile("./2019/assets/day1.txt");
const data = input.split("\n").map(Number);

const p1 = sumOfFuel(data);
console.log(p1);

const p2 = sumOfFuel2(data);
console.log(p2);
