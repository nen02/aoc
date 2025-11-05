import { readTextFile } from "../utils.ts";

function getTotalArea(input: string[]): number {
  let total = 0;

  for (const row of input) {
    const [w, l, h] = row.split("x").map(Number);
    const i = w * l,
      j = l * h,
      k = h * w;

    total += (i + j + k) * 2 + Math.min(i, j, k);
  }

  return total;
}

function getTotalRibbonArea(input: string[]): number {
  let total = 0;

  for (const row of input) {
    const [a, b, c] = row
      .split("x")
      .map(Number)
      .sort((a, b) => a - b);

    total += 2 * (a + b) + a * b * c;
  }

  return total;
}

const input = await readTextFile("./2015/assets/day2.txt");
const data = input.split("\n");

const p1 = getTotalArea(data);
console.log(p1);

const p2 = getTotalRibbonArea(data);
console.log(p2);
