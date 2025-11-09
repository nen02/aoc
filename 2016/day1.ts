import { readTextFile } from "../utils.ts";

const directions = {
  n: {
    l: "w",
    r: "e",
    lx: -1,
    ly: 0,
    rx: 1,
    ry: 0,
  },
  e: {
    l: "n",
    r: "s",
    lx: 0,
    ly: -1,
    rx: 0,
    ry: 1,
  },
  w: {
    l: "s",
    r: "n",
    lx: 0,
    ly: 1,
    rx: 0,
    ry: -1,
  },
  s: {
    l: "e",
    r: "w",
    lx: 1,
    ly: 0,
    rx: -1,
    ry: 0,
  },
};

function countBlocks(steps: string[]): number {
  let x = 0;
  let y = 0;

  let facing = "n";

  for (const step of steps) {
    const dir = step[0];
    const blocks = Number(step.slice(1));

    let step_x: number;
    let step_y: number;
    let nextFacing: string;

    if (dir === "L") {
      step_x = directions[facing].lx;
      step_y = directions[facing].ly;
      nextFacing = directions[facing].l;
    } else {
      step_x = directions[facing].rx;
      step_y = directions[facing].ry;
      nextFacing = directions[facing].r;
    }

    x += step_x * blocks;
    y += step_y * blocks;

    facing = nextFacing;
  }

  return Math.abs(x) + Math.abs(y);
}

function countBlocksP2(steps: string[]): number {
  let x = 0;
  let y = 0;
  let facing = "n";

  const seen = new Set<string>();
  seen.add("0,0");

  for (const step of steps) {
    const dir = step[0];
    const blocks = Number(step.slice(1));

    let step_x: number;
    let step_y: number;
    let nextFacing: string;

    if (dir === "L") {
      step_x = directions[facing].lx;
      step_y = directions[facing].ly;
      nextFacing = directions[facing].l;
    } else {
      step_x = directions[facing].rx;
      step_y = directions[facing].ry;
      nextFacing = directions[facing].r;
    }

    for (let i = 1; i <= blocks; i++) {
      x += step_x;
      y += step_y;

      if (seen.has(x + "," + y)) {
        return Math.abs(x) + Math.abs(y);
      }

      seen.add(x + "," + y);
    }

    facing = nextFacing;
  }

  return 0;
}

const input = await readTextFile("./2016/assets/day1.txt");
const steps = input.split(", ");

const p1 = countBlocks(steps);
console.log(p1);

const p2 = countBlocksP2(steps);
console.log(p2);
