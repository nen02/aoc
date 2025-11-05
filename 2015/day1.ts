import { readTextFile } from "../utils.ts";

function getCurrentFloor(input: string): number {
  const tracker = {
    "(": 0,
    ")": 0,
  };

  for (const char of input) {
    tracker[char]++;
  }

  return tracker["("] - tracker[")"];
}

function basementIndex(input: string) {
  let i = 0,
    floor = 0;

  const charVal = {
    "(": 1,
    ")": -1,
  };

  while (floor !== -1) {
    floor += charVal[input[i++]];
  }

  return i;
}

const input = await readTextFile("./2015/assets/day1.txt");

const p1 = getCurrentFloor(input);
console.log(p1);

const p2 = basementIndex(input);
console.log(p2);
