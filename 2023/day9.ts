import { readTextFile } from "../utils.ts";

function getNextValue(series: number[]): number {
  const drilldown = [series];
  while (!drilldown[drilldown.length - 1].every((n) => n === 0)) {
    const prev = drilldown[drilldown.length - 1];
    const next: number[] = [];
    for (let i = 1; i < prev.length; i++) {
      next.push(prev[i] - prev[i - 1]);
    }
    drilldown.push(next);
  }

  let res = 0;
  for (let i = drilldown.length - 1; i >= 0; i--) {
    res += drilldown[i][drilldown[i].length - 1];
  }

  return res;
}

function getPreviousValue(series: number[]): number {
  const drilldown = [series];

  while (!drilldown[drilldown.length - 1].every((n) => n === 0)) {
    const prev = drilldown[drilldown.length - 1];
    const next: number[] = [];
    for (let i = 1; i < prev.length; i++) {
      next.push(prev[i] - prev[i - 1]);
    }
    drilldown.push(next);
  }

  let res = 0;
  for (let i = drilldown.length - 1; i >= 0; i--) {
    res = drilldown[i][0] - res;
  }

  return res;
}

function sumOfExtrapolatedValues(data: number[][]) {
  let res = 0;
  for (const row of data) {
    res += getNextValue(row);
  }
  return res;
}

function sumOfPrevValues(data: number[][]) {
  let res = 0;
  for (const row of data) {
    res += getPreviousValue(row);
  }
  return res;
}

const input = await readTextFile("./2023/assets/day9.txt");
const data = input.split("\n").map((str) => str.split(" ").map(Number));

const p1 = sumOfExtrapolatedValues(data);
console.log(p1);

const p2 = sumOfPrevValues(data);
console.log(p2);
