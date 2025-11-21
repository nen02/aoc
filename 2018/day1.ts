import { readTextFile } from "../utils.ts";

function findTheFrequency(data: string[]): number {
  let res = 0;

  for (const row of data) {
    const operation = row[0];
    const num = Number(row.slice(1));

    if (operation === "+") res += num;
    else res -= num;
  }

  return res;
}

function getFirstFrequency(data: string[]): number {
  const seen = new Set<number>();
  let i = 0;
  let res = 0;

  while (true) {
    const row = data[i++ % data.length];
    const operation = row[0];
    const num = Number(row.slice(1));

    if (operation === "+") res += num;
    else res -= num;

    if (seen.has(res)) return res;
    seen.add(res);
  }
}

const input = await readTextFile("./2018/assets/day1.txt");
const data = input.split("\n");

const p1 = findTheFrequency(data);
console.log(p1);

const p2 = getFirstFrequency(data);
console.log(p2);
