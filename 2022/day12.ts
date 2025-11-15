import { readTextFile } from "../utils.ts";

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function getStart(data: string[]): [number, number] {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === "S") {
        return [i, j];
      }
    }
  }
  return [0, 0];
}

function getLvlDiff(ch: string): number {
  if (ch === "S") ch = "a";
  if (ch === "E") ch = "z";
  return ch.charCodeAt(0);
}

function solution_p1(data: string[], start: [number, number]): number {
  const rows = data.length,
    cols = data[0].length;

  const queue: Array<[[number, number], number]> = [[start, 0]];
  const visited = new Set<string>([`${start[0]},${start[1]}`]);

  while (queue.length) {
    const [[y, x], step] = queue.shift()!;
    if (data[y][x] === "E") return step;

    for (const [dy, dx] of directions) {
      const y1 = y + dy;
      const x1 = x + dx;

      if (y1 < 0 || x1 < 0 || y1 >= rows || x1 >= cols) continue;

      const key = `${y1},${x1}`;
      if (visited.has(key)) continue;

      const inc = getLvlDiff(data[y1][x1]) - getLvlDiff(data[y][x]);
      if (inc <= 1) {
        visited.add(key);
        queue.push([[y1, x1], step + 1]);
      }
    }
  }

  return Infinity;
}

function solution_p2(data: string[]): number {
  const starts: Array<[number, number]> = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === "S" || data[i][j] === "a") {
        starts.push([i, j]);
      }
    }
  }

  let min = Infinity;
  for (const start of starts) {
    const res = solution_p1(data, start);
    min = Math.min(min, res);
  }

  return min;
}

const input = await readTextFile("./tb.txt");
const data = input.split("\n");

const p1 = solution_p1(data, getStart(data));
console.log(p1);

const p2 = solution_p2(data);
console.log(p2);
