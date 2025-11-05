import { readTextFile } from "../utils.ts";

const dirVal = { L: 0, R: 1 };

function stepsRequired(path: string, data: Record<string, [string, string]>) {
  let res = 0,
    i = 0,
    cur = "AAA";

  while (true) {
    if (cur === "ZZZ") break;

    res++;
    cur = data[cur][dirVal[path[i]]];
    i = (i + 1) % path.length;
  }

  return res;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

function stepsRequiredSimultaneously(
  path: string,
  data: Record<string, [string, string]>,
) {
  const dirVal = { L: 0, R: 1 };
  const starts = Object.keys(data).filter((key) => key.endsWith("A"));
  const cycleSteps: number[] = [];

  for (const start of starts) {
    let curr = start;
    let steps = 0;
    let i = 0;

    while (!curr.endsWith("Z")) {
      curr = data[curr][dirVal[path[i]]];
      steps++;
      i = (i + 1) % path.length;
    }

    cycleSteps.push(steps);
  }

  return cycleSteps.reduce((a, b) => lcm(a, b));
}

const input = await readTextFile("./2023/assets/day8.txt");

const [path, rows] = input.split(/\r?\n\r?\n/);
const data = rows.split("\n").reduce((row, curent) => {
  const [pos, dir] = curent.split(" = ");
  const arrDir = dir.substring(1, dir.length - 1).split(", ");
  row[pos] = arrDir;
  return row;
}, {});

const p1 = stepsRequired(path, data);
console.log(p1);

const p2 = stepsRequiredSimultaneously(path, data);
console.log(p2);
