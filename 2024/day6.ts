import { readTextFile } from "../utils.ts";

function isOutOfBounds(y: number, x: number, y_size: number, x_size: number) {
  return y < 0 || x < 0 || y >= y_size || x >= x_size;
}

const dirVal = {
  up: [-1, 0],
  right: [0, 1],
  down: [1, 0],
  left: [0, -1],
};

type dirType = "up" | "right" | "down" | "left";

const nextDir: Record<dirType, dirType> = {
  up: "right",
  right: "down",
  down: "left",
  left: "up",
};

function countDistinctPositions(
  map: string[],
  startPos: [number, number],
  dir: dirType,
): number {
  const totalRows = map.length;
  const totalCols = map[0].length;
  const paths = new Set<string>();

  let y = startPos[0],
    x = startPos[1];

  while (true) {
    paths.add(y + "," + x);

    const v = dirVal[dir][0];
    const h = dirVal[dir][1];

    if (isOutOfBounds(y + v, x + h, totalRows, totalCols)) break;

    if (map[y + v][x + h] === "#") {
      dir = nextDir[dir];
    } else {
      y += v;
      x += h;
    }
  }

  return paths.size;
}

function doesGuardLoop(
  map: string[],
  startPos: [number, number],
  dir: dirType,
): boolean {
  const totalRows = map.length;
  const totalCols = map[0].length;
  const visited = new Set<string>();

  let y = startPos[0];
  let x = startPos[1];
  let currentDir = dir;

  while (true) {
    const state = `${y},${x},${currentDir}`;
    if (visited.has(state)) {
      return true;
    }
    visited.add(state);

    const [dy, dx] = dirVal[currentDir];

    if (isOutOfBounds(y + dy, x + dx, totalRows, totalCols)) {
      return false;
    }

    if (map[y + dy][x + dx] === "#") {
      currentDir = nextDir[currentDir];
    } else {
      y += dy;
      x += dx;
    }
  }
}

const input = await readTextFile("./2024/assets/day6.txt");
const rows = input.split("\n");

let startPos: [number, number] = [0, 0];
for (const [index, row] of rows.entries()) {
  if (row.includes("^")) {
    startPos = [index, row.indexOf("^")];
  }
}

const p1 = countDistinctPositions(rows, startPos, "up");
console.log(p1);

let p2 = 0;

for (let y = 0; y < rows.length; y++) {
  for (let x = 0; x < rows[0].length; x++) {
    if (rows[y][x] !== "." || (y === startPos[0] && x === startPos[1]))
      continue;

    const modifiedMap = [...rows];
    const newRow = rows[y].substring(0, x) + "#" + rows[y].substring(x + 1);
    modifiedMap[y] = newRow;

    if (doesGuardLoop(modifiedMap, startPos, "up")) {
      p2++;
    }
  }
}

console.log("Part 2:", p2);
