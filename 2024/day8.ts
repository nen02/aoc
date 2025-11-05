import { readTextFile } from "../utils.ts";

function antinodeCount(data: string[]): number {
  const positions: Record<string, [number, number][]> = {};

  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      if (data[y][x] === ".") continue;

      if (data[y][x] in positions) positions[data[y][x]].push([x, y]);
      else positions[data[y][x]] = [[x, y]];
    }
  }

  const rowsCount = data.length - 1;
  const colsCount = data[0].length - 1;

  const seen = new Set<string>();

  for (const points of Object.values(positions)) {
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i][0] - points[j][0];
        const dy = points[i][1] - points[j][1];

        const x1 = points[i][0] + dx;
        const y1 = points[i][1] + dy;

        if (x1 >= 0 && x1 <= colsCount && y1 >= 0 && y1 <= rowsCount) {
          seen.add(`${y1},${x1}`);
        }

        const x2 = points[j][0] - dx;
        const y2 = points[j][1] - dy;
        if (x2 >= 0 && x2 <= colsCount && y2 >= 0 && y2 <= rowsCount) {
          seen.add(`${y2},${x2}`);
        }
      }
    }
  }

  return seen.size;
}

function antinodeCountMultiple(data: string[]): number {
  const positions: Record<string, [number, number][]> = {};

  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      if (data[y][x] === ".") continue;

      if (data[y][x] in positions) positions[data[y][x]].push([x, y]);
      else positions[data[y][x]] = [[x, y]];
    }
  }

  const rowsCount = data.length - 1;
  const colsCount = data[0].length - 1;

  const seen = new Set<string>();

  for (const points of Object.values(positions)) {
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const [x1, y1] = points[i];
        const [x2, y2] = points[j];

        const dx = x1 - x2;
        const dy = y1 - y2;

        let x = x1;
        let y = y1;
        while (x >= 0 && x <= colsCount && y >= 0 && y <= rowsCount) {
          seen.add(`${y},${x}`);
          x += dx;
          y += dy;
        }

        x = x2;
        y = y2;
        while (x >= 0 && x <= colsCount && y >= 0 && y <= rowsCount) {
          seen.add(`${y},${x}`);
          x -= dx;
          y -= dy;
        }
      }
    }
  }

  return seen.size;
}

const input = await readTextFile("./2024/assets/day8.txt");
const data = input.split("\n");

const p1 = antinodeCount(data);
console.log(p1);

const p2 = antinodeCountMultiple(data);
console.log(p2);
