import { readTextFile } from "../utils.ts";

const split = new Set<string>();

function solution1(data: string[][], pos: number[]): void {
  const [y, x] = pos;
  if (data.length === y + 1 || split.has(`${x},${y + 1}`)) return;

  const down = data[y + 1][x];

  if (down === "^") {
    split.add(`${x + 1},${y + 1}`);
    split.add(`${x + 1},${y - 1}`);

    solution1(data, [y + 1, x + 1]);
    solution1(data, [y + 1, x - 1]);
  } else {
    solution1(data, [y + 1, x]);
  }
}

function solution2(data: string[][], xStart: number) {
  const maxRows = data.length;
  const maxCols = data[0].length;

  const timeline = {};

  function dfs(y: number, x: number) {
    if (y === maxRows || x < 0 || x >= maxCols) return 1;

    const key = `${y},${x}`;
    if (key in timeline) return timeline[key];

    let res: number;
    if (data[y][x] === "^") {
      const left = dfs(y, x - 1);
      const right = dfs(y, x + 1);

      res = left + right;
    } else {
      res = dfs(y + 1, x);
    }

    timeline[key] = res;

    return res;
  }

  return dfs(1, xStart);
}

const input = await readTextFile("./2025/assets/day7.txt");
const data = input.split("\n").map((row) => row.split(""));

const start = data[0].findIndex((i) => i === "S");

solution1(data, [0, start]);
console.log(split.size / 2);

const p2 = solution2(data, start);
console.log(p2);
