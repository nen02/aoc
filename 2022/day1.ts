import { readTextFile } from "../utils.ts";

function highestCalories(data: number[][]): number {
  let highest = 0;

  for (const group of data) {
    const totalCalories = group.reduce((a, c) => a + c, 0);
    highest = Math.max(highest, totalCalories);
  }

  return highest;
}

function topThreeCalories(data: number[][]): number {
  const highest = [0, 0, 0];

  for (const group of data) {
    let totalCalories = group.reduce((a, c) => a + c, 0);

    for (let i = 0; i < 3; i++) {
      if (totalCalories > highest[i]) {
        const temp = highest[i];
        highest[i] = totalCalories;
        totalCalories = temp;
      }
    }
  }

  return highest[0] + highest[1] + highest[2];
}

const input = await readTextFile("./2022/assets/day1.txt");
const data = input
  .split("\n\n")
  .map((group: string) => group.split("\n").map(Number));

const p1 = highestCalories(data);
console.log(p1);

const p2 = topThreeCalories(data);
console.log(p2);
