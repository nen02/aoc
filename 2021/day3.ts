import { readTextFile } from "../utils.ts";

function getConsumptionPower(data: string[]): number {
  const gamma = Array.from({ length: data[0].length }, () => ({ 0: 0, 1: 0 }));

  for (const row of data) {
    for (let i = 0; i < row.length; i++) {
      gamma[i][row[i]]++;
    }
  }

  let mostCommon = "";
  let leastCommon = "";

  for (const item of gamma) {
    if (item[0] > item[1]) {
      mostCommon += "0";
      leastCommon += "1";
    } else {
      mostCommon += "1";
      leastCommon += "0";
    }
  }

  return parseInt(mostCommon, 2) * parseInt(leastCommon, 2);
}

function getConsumptionPower2(data: string[]): number {
  let mostCommon = [...data];
  let leastCommon = [...data];

  for (let index = 0; index < data[0].length; index++) {
    let zeroCount = 0;
    let oneCount = 0;

    for (const item of mostCommon) {
      if (item[index] === "0") zeroCount++;
      else oneCount++;
    }

    const mostCommonFilter = zeroCount > oneCount ? "0" : "1";

    zeroCount = 0;
    oneCount = 0;

    for (const item of leastCommon) {
      if (item[index] === "0") zeroCount++;
      else oneCount++;
    }

    const leastCommonFilter = zeroCount > oneCount ? "1" : "0";

    if (mostCommon.length !== 1) {
      mostCommon = mostCommon.filter(
        (arrItem) => arrItem[index] === mostCommonFilter,
      );
    }

    if (leastCommon.length !== 1) {
      leastCommon = leastCommon.filter(
        (arrItem) => arrItem[index] === leastCommonFilter,
      );
    }
  }

  return parseInt(mostCommon[0], 2) * parseInt(leastCommon[0], 2);
}

const input = await readTextFile("./2021/assets/day3.txt");
const data = input.split("\n");

const p1 = getConsumptionPower(data);
console.log(p1);

const p2 = getConsumptionPower2(data);
console.log(p2);
