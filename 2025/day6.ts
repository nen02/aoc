import { readTextFile } from "../utils.ts";

function solution1(data: string[][]): number {
  const operations = data[data.length - 1];

  let res = 0;

  for (let i = 0; i < data[0].length; i++) {
    let problem = "";

    for (let j = 0; j < data.length - 1; j++) {
      problem += data[j][i] + operations[i];
    }

    problem = problem.slice(0, problem.length - 1);

    res += eval(problem);
  }

  return res;
}

function solution2(data: string[][]): number {
  const operations = data[data.length - 1].map((operation) => operation.trim());

  let res = 0;

  for (let i = 0; i < data[0].length; i++) {
    const nums: string[] = [];

    for (let j = 0; j < data.length - 1; j++) {
      nums.push(data[j][i]);
    }

    let problem = "";

    for (let k = 0; k < nums[0].length; k++) {
      let num = "";

      for (let l = 0; l < nums.length; l++) {
        num += nums[l]?.[k] === " " ? "" : nums[l]?.[k] || "";
      }

      if (num.trim() !== "") {
        problem += num + operations[i];
      }
    }

    problem = problem.slice(0, problem.length - 1);
    res += eval(problem);
  }

  return res;
}

const input = await readTextFile("./2025/assets/day6.txt");
const data = input.split("\n").map((row) => row.trim().split(/\s+/));

const p1 = solution1(data);
console.log(p1);

function splitByIndexes(str: string, indexes: number[]): string[] {
  const res: string[] = [];
  let lastIndex = 0;

  for (let i = 0; i < indexes.length; i++) {
    const index = indexes[i];
    res.push(str.slice(lastIndex, index));
    lastIndex = index;
  }

  res.push(str.slice(lastIndex));

  return res;
}

const splits: number[] = [];

const input2 = input.split("\n");
input2.sort((a, b) => b.length - a.length);

for (let i = 0; i < input2[0].length; i++) {
  let split = true;
  for (let j = 0; j < input2.length; j++) {
    if (input2[j][i] !== " ") {
      split = false;
      break;
    }
  }

  if (split) splits.push(i);
}

const data2 = input2.map((row) => splitByIndexes(row, splits));
const p2 = solution2(data2);
console.log(p2);
