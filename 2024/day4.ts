import { readTextFile } from "../utils.ts";

function countXMAS(grid: string[]): number {
  const word = "XMAS";
  const numRows = grid.length;
  const numCols = grid[0].length;
  let count = 0;

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

  function isInBounds(row: number, col: number): boolean {
    return row >= 0 && row < numRows && col >= 0 && col < numCols;
  }

  function checkDirection(
    r: number,
    c: number,
    dr: number,
    dc: number
  ): boolean {
    for (let i = 0; i < word.length; i++) {
      const nr = r + dr * i;
      const nc = c + dc * i;
      if (!isInBounds(nr, nc) || grid[nr][nc] !== word[i]) {
        return false;
      }
    }
    return true;
  }

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      for (const [dr, dc] of directions) {
        if (checkDirection(row, col, dr, dc)) {
          count++;
        }
      }
    }
  }

  return count;
}

function countXMAS_XShape(grid: string[]): number {
  const numRows = grid.length;
  const numCols = grid[0].length;
  let count = 0;

  const isInBounds = (r: number, c: number) =>
    r >= 0 && r < numRows && c >= 0 && c < numCols;

  const isMASorSAM = (chars: string[]): boolean => {
    const str = chars.join("");
    return str === "MAS" || str === "SAM";
  };

  for (let r = 1; r < numRows - 1; r++) {
    for (let c = 1; c < numCols - 1; c++) {
      if (grid[r][c] !== "A") continue;

      if (
        isInBounds(r - 1, c - 1) &&
        isInBounds(r + 1, c + 1) &&
        isMASorSAM([grid[r - 1][c - 1], grid[r][c], grid[r + 1][c + 1]])
      ) {
        if (
          isInBounds(r - 1, c + 1) &&
          isInBounds(r + 1, c - 1) &&
          isMASorSAM([grid[r - 1][c + 1], grid[r][c], grid[r + 1][c - 1]])
        ) {
          count++;
        }
      }
    }
  }

  return count;
}

const input = await readTextFile("./2024/assets/day4.txt");
const arrData = input.split("\n");

console.log(countXMAS(arrData));
console.log(countXMAS_XShape(arrData));
