import { readTextFile } from "../utils.ts";

function isOutOfBounds(x: number, y: number, maxCols: number, maxRows: number) {
  return x < 0 || y < 0 || x > maxCols || y > maxRows;
}

function hike(
  map: number[][],
  prev: number,
  [x, y]: [number, number],
  seen: Set<string>,
): void {
  if (
    isOutOfBounds(x, y, map[0].length - 1, map.length - 1) ||
    map[y][x] - prev !== 1
  )
    return;

  const current = map[y][x];
  if (current === 9) {
    seen.add(x + "," + y);
    return;
  }

  hike(map, current, [x, y - 1], seen);
  hike(map, current, [x + 1, y], seen);
  hike(map, current, [x, y + 1], seen);
  hike(map, current, [x - 1, y], seen);
}

function hike2(
  map: number[][],
  prev: number,
  [x, y]: [number, number],
): number {
  if (
    isOutOfBounds(x, y, map[0].length - 1, map.length - 1) ||
    map[y][x] - prev !== 1
  )
    return 0;

  const current = map[y][x];
  if (current === 9) {
    return 1;
  }

  return (
    hike2(map, current, [x, y - 1]) +
    hike2(map, current, [x + 1, y]) +
    hike2(map, current, [x, y + 1]) +
    hike2(map, current, [x - 1, y])
  );
}

function sumOfTrailheads(data: number[][]): number {
  let total = 0;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === 0) {
        const seen = new Set<string>();
        hike(data, -1, [j, i], seen);
        total += seen.size;
      }
    }
  }

  return total;
}

function sumOfTrailheads2(data: number[][]): number {
  let total = 0;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === 0) {
        total += hike2(data, -1, [j, i]);
      }
    }
  }

  return total;
}

const input = await readTextFile("./2024/assets/day10.txt");
const data = input.split("\n").map((row) => row.split("").map(Number));

const p1 = sumOfTrailheads(data);
console.log(p1);

const p2 = sumOfTrailheads2(data);
console.log(p2);
