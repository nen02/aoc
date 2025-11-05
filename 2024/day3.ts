import { readTextFile } from "../utils.ts";

function sumValidMulInstructions(input: string): number {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  let match: RegExpExecArray | null;
  let total = 0;

  while ((match = regex.exec(input)) !== null) {
    const x: number = parseInt(match[1], 10);
    const y: number = parseInt(match[2], 10);
    total += x * y;
  }

  return total;
}

function sumEnabledMulInstructions(input: string): number {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g;

  let match: RegExpExecArray | null;
  let enabled = true;
  let total = 0;

  while ((match = regex.exec(input)) !== null) {
    const token: string = match[0];
    if (token === "do()") {
      enabled = true;
    } else if (token === "don't()") {
      enabled = false;
    } else if (enabled) {
      const x: number = parseInt(match[1], 10);
      const y: number = parseInt(match[2], 10);
      total += x * y;
    }
  }

  return total;
}

const input = await readTextFile("./2024/assets/day3.txt");

console.log(sumValidMulInstructions(input));
console.log(sumEnabledMulInstructions(input));
