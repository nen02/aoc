import { readTextFile } from "../utils.ts";

const keys = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
];

const keys2 = [
  ["", "", "1", "", ""],
  ["", "2", "3", "4", ""],
  ["5", "6", "7", "8", "9"],
  ["", "A", "B", "C", ""],
  ["", "", "D", "", ""],
];

const directions = {
  U: [0, -1],
  L: [-1, 0],
  R: [1, 0],
  D: [0, 1],
};

function isOutOfBounds(x: number, y: number): boolean {
  return x < 0 || y < 0 || x > 2 || y > 2;
}

function isOutOfBoundsOrEmpty(x: number, y: number): boolean {
  return x < 0 || y < 0 || x > 4 || y > 4 || keys2[y][x] === "";
}

function getBathroomCode(data: string[]): number {
  let res = "";
  for (const row of data) {
    let x1 = 1;
    let y1 = 1;
    for (const turn of row) {
      const [x2, y2] = directions[turn];
      if (!isOutOfBounds(x1 + x2, y1 + y2)) {
        x1 += x2;
        y1 += y2;
      }
    }

    res += keys[y1][x1];
  }

  return Number(res);
}

function getBathroomCode2(data: string[]): string {
  let res = "";

  for (const row of data) {
    let x1 = 1;
    let y1 = 1;
    for (const turn of row) {
      const [x2, y2] = directions[turn];
      if (!isOutOfBoundsOrEmpty(x1 + x2, y1 + y2)) {
        x1 += x2;
        y1 += y2;
      }
    }

    res += keys2[y1][x1];
  }

  return res;
}

const input = await readTextFile("./2016/assets/day2.txt");
const data = input.split("\n");

const p1 = getBathroomCode(data);
console.log(p1);

const p2 = getBathroomCode2(data);
console.log(p2);
