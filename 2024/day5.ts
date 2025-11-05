import { readTextFile } from "../utils.ts";

function addMid(rules: Record<string, string[]>, pages: string[][]) {
  let res = 0;

  setLoop: for (const row of pages) {
    for (let i = row.length - 1; i > 0; i--) {
      if (!rules[row[i]]) continue;
      if (rules[row[i]].includes(row[i - 1])) continue setLoop;
    }

    res += Number(row[Math.floor(row.length / 2)]);
  }

  return res;
}

function addMidOfIncorrectOrders(
  rules: Record<string, string[]>,
  pages: string[][],
) {
  let res = 0;

  for (const row of pages) {
    let isCorrected = false;
    let i = row.length - 1;
    while (i > 0) {
      if (rules[row[i]] && rules[row[i]].includes(row[i - 1])) {
        const temp = row[i];
        row[i] = row[i - 1];
        row[i - 1] = temp;
        isCorrected = true;
        i++;
      } else i--;
    }

    if (isCorrected) {
      res += Number(row[Math.floor(row.length / 2)]);
    }
  }

  return res;
}

const input = await readTextFile("./2024/assets/day5.txt");
const [rules, pages] = input.split(/\r?\n\r?\n/);

const arrRules = rules.split("\n").map((str) => str.split("|"));
const objRules: Record<string, string[]> = arrRules.reduce((obj, current) => {
  if (obj[current[0]]) obj[current[0]].push(current[1]);
  else obj[current[0]] = [current[1]];

  return obj;
}, {});
const arrPages = pages.split("\n").map((str) => str.split(","));

const p1 = addMid(objRules, arrPages);
console.log(p1);

const p2 = addMidOfIncorrectOrders(objRules, arrPages);
console.log(p2);
