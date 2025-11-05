import { readTextFile } from "../utils.ts";

function getTotalHouses(input: string): number {
  const visited = new Set<string>();
  let x = 0,
    y = 0;
  visited.add(`0,0`);

  for (const c of input) {
    switch (c) {
      case "^":
        y--;
        break;
      case "v":
        y++;
        break;
      case "<":
        x--;
        break;
      case ">":
        x++;
        break;
    }
    visited.add(`${x},${y}`);
  }

  return visited.size;
}

function roboSanta(input: string): number {
  const visited = new Set<string>();
  const santa = [0, 0];
  const robo = [0, 0];

  visited.add(`0,0`);

  for (let i = 0; i < input.length; i++) {
    const mover = i % 2 === 0 ? santa : robo;
    switch (input[i]) {
      case "^":
        mover[1]--;
        break;
      case "v":
        mover[1]++;
        break;
      case "<":
        mover[0]--;
        break;
      case ">":
        mover[0]++;
        break;
    }
    visited.add(`${mover[0]},${mover[1]}`);
  }

  return visited.size;
}

const input = await readTextFile("./2015/assets/day3.txt");

const p1 = getTotalHouses(input);
console.log(p1);

const p2 = roboSanta(input);
console.log(p2);
