import { readTextFile } from "../utils.ts";

const input = await readTextFile("./2023/assets/day3.txt");
const data = input.split("\n");

const directions = [
  [0, 1], // Right
  [0, -1], // Left
  [1, 0], // Down
  [-1, 0], // Up
  [1, 1], // Down-Right
  [-1, -1], // Up-Left
  [1, -1], // Down-Left
  [-1, 1], // Up-Right
];

function isSymbol(char: string) {
  return char !== "." && isNaN(Number(char));
}

function isOutOfBounds(x: number, y: number, maxRow: number, maxCol: number) {
  return x < 0 || y < 0 || x > maxCol || y > maxRow;
}

function sumOfPartNumbers(data: string[]): number {
  const colCount = data[0].length - 1;
  const rowCount = data.length - 1;
  let res = 0;

  for (let y = 0; y <= rowCount; y++) {
    let numAcc = "",
      isAdjacentToSymbol = false;

    for (let x = 0; x <= colCount; x++) {
      const num = parseInt(data[y][x]);

      if (isNaN(num)) {
        if (numAcc !== "" && isAdjacentToSymbol) {
          res += Number(numAcc);
        }

        numAcc = "";
        isAdjacentToSymbol = false;
        continue;
      }

      numAcc += num;

      if (isAdjacentToSymbol && x < colCount) continue;

      for (const direction of directions) {
        if (
          !isOutOfBounds(x + direction[1], y + direction[0], colCount, rowCount)
        ) {
          const char = data[y + direction[0]][x + direction[1]];
          if (isSymbol(char)) {
            isAdjacentToSymbol = true;
            break;
          }
        }
      }

      if (x === colCount && isAdjacentToSymbol) {
        res += Number(numAcc);
      }
    }
  }

  return res;
}

function sumOfGearRatios(data: string[]): number {
  const colCount = data[0].length,
    rowCount = data.length;
  let res = 0;

  function isDigit(ch: string): boolean {
    return ch >= "0" && ch <= "9";
  }

  function getNumber(x: number, y: number): number {
    let numAcc = data[y][x];
    let leftEnd = false,
      rightEnd = false;

    let index = 1;
    while (true) {
      if (!leftEnd) {
        if (x - index < 0 || isNaN(Number(data[y][x - index]))) leftEnd = true;
        else numAcc = data[y][x - index] + numAcc;
      }

      if (!rightEnd) {
        if (x + index === colCount || isNaN(Number(data[y][x + index])))
          rightEnd = true;
        else numAcc += data[y][x + index];
      }

      if (leftEnd && rightEnd) break;
      index++;
    }

    return Number(numAcc);
  }

  for (let y = 0; y < rowCount; y++) {
    for (let x = 0; x < colCount; x++) {
      if (data[y][x] !== "*") continue;

      const adjacentNumbers = new Set<string>();

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;

          const nx = x + dx;
          const ny = y + dy;

          if (nx < 0 || ny < 0 || ny >= rowCount || nx >= colCount) continue;

          if (isDigit(data[ny][nx])) {
            const num = getNumber(nx, ny);
            adjacentNumbers.add(`${num},${ny}`);
          }
        }
      }

      if (adjacentNumbers.size === 2) {
        const nums = Array.from(adjacentNumbers).map((s) =>
          parseInt(s.split(",")[0]),
        );
        res += nums[0] * nums[1];
      }
    }
  }

  return res;
}

const p1 = sumOfPartNumbers(data);
console.log(p1);

const p2 = sumOfGearRatios(data);
console.log(p2);
