import { readTextFile } from "../utils.ts";

const colors = ["red", "green", "blue"];
const limits: Record<(typeof colors)[number], number> = {
  red: 12,
  green: 13,
  blue: 14,
};

function possibleGames(games: string[]): number {
  let res = 0;

  gameLoop: for (const [index, game] of games.entries()) {
    const sets = game.replace(/Game\s*\d+:\s/, "").split(";");

    for (const set of sets) {
      for (const shown of set.split(",")) {
        for (const color of colors) {
          if (shown.includes(color)) {
            const num = shown.match(/\d+/);
            if (Number(num ? num[0] : "0") > limits[color]) {
              continue gameLoop;
            }
          }
        }
      }
    }

    res += index + 1;
  }

  return res;
}

function minimumPossible(games: string[]): number {
  let res = 0;

  for (const game of games) {
    const min: Record<(typeof colors)[number], number> = {
      red: 0,
      green: 0,
      blue: 0,
    };
    const sets = game.replace(/Game\s*\d+:\s/, "").split(";");

    for (const set of sets) {
      for (const shown of set.split(",")) {
        for (const color of colors) {
          if (shown.includes(color)) {
            const numStr = shown.match(/\d+/);
            const num = Number(numStr ? numStr[0] : "0");

            if (min[color] < num) min[color] = num;
          }
        }
      }
    }

    res += min.red * min.green * min.blue;
  }

  return res;
}

const input = await readTextFile("./2023/assets/day2.txt");
const games = input.split("\n");

const p1 = possibleGames(games);
console.log(p1);

const p2 = minimumPossible(games);
console.log(p2);
