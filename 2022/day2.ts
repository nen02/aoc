import { readTextFile } from "../utils.ts";

type PICK = "A" | "B" | "C";
type COUNTER = "X" | "Y" | "Z";

type SCORE_MAP = {
  A: {
    X: number;
    Y: number;
    Z: number;
  };
  B: {
    X: number;
    Y: number;
    Z: number;
  };
  C: {
    X: number;
    Y: number;
    Z: number;
  };
};

const gameScore = {
  A: {
    X: 1 + 3,
    Y: 2 + 6,
    Z: 3 + 0,
  },
  B: {
    X: 1 + 0,
    Y: 2 + 3,
    Z: 3 + 6,
  },
  C: {
    X: 1 + 6,
    Y: 2 + 0,
    Z: 3 + 3,
  },
};

const gameScore2 = {
  A: {
    X: 3 + 0,
    Y: 1 + 3,
    Z: 2 + 6,
  },
  B: {
    X: 1 + 0,
    Y: 2 + 3,
    Z: 3 + 6,
  },
  C: {
    X: 2 + 0,
    Y: 3 + 3,
    Z: 1 + 6,
  },
};

function totalScore(data: Array<[PICK, COUNTER]>, scoreMap: SCORE_MAP): number {
  let res = 0;

  for (const [pick, counter] of data) {
    res += scoreMap[pick][counter];
  }

  return res;
}

const input = await readTextFile("./2022/assets/day2.txt");
const data = input.split("\n").map((row) => row.split(" "));

const p1 = totalScore(data, gameScore);
console.log(p1);

const p2 = totalScore(data, gameScore2);
console.log(p2);
