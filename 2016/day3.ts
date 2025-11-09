import { readTextFile } from "../utils.ts";

function countValidTriangles(data: number[][]): number {
  let count = 0;
  for (const row of data) {
    const [x, y, z] = row;
    if (x + y > z && y + z > x && z + x > y) count++;
  }

  return count;
}

function countValidTriangles2(data: number[][]): number {
  let count = 0;
  for (let i = 0; i < data.length; i += 3) {
    for (let j = 0; j < 3; j++) {
      const x = data[i][j];
      const y = data[i + 1][j];
      const z = data[i + 2][j];

      if (x + y > z && y + z > x && z + x > y) count++;
    }
  }

  return count;
}

const input = await readTextFile("./2016/assets/day3.txt");
const data = input
  .trim()
  .split("\n")
  .map((row) => row.trim().split(/\s+/).map(Number));

const p1 = countValidTriangles(data);
console.log(p1);

const p2 = countValidTriangles2(data);
console.log(p2);
