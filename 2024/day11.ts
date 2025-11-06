import { readTextFile } from "../utils.ts";

const cache = {};

function countStone(stone: string, blinks: number): number {
  const key = `${stone},${blinks}`;
  if (key in cache) return cache[key];

  if (blinks === 0) return 1;

  let result: number;

  if (stone === "0") {
    result = countStone("1", blinks - 1);
  } else if (stone.length % 2 === 0) {
    const half = stone.length / 2;
    const left = Number(stone.slice(0, half)).toString();
    const right = Number(stone.slice(half)).toString();

    result = countStone(left, blinks - 1) + countStone(right, blinks - 1);
  } else {
    const next = (Number(stone) * 2024).toString();
    result = countStone(next, blinks - 1);
  }

  cache[key] = result;
  return result;
}

export function countStones(stones: string[], blinks: number): number {
  return stones.reduce((sum, stone) => sum + countStone(stone, blinks), 0);
}

const input = await readTextFile("./2024/assets/day11.txt");

const p1 = countStones(input.split(" "), 25);
console.log(p1);

const p2 = countStones(input.split(" "), 75);
console.log(p2);
