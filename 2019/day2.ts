import { readTextFile } from "../utils.ts";

function getValAtPosZero(program: number[]): number {
  const data = [...program];
  data[1] = 12;
  data[2] = 2;

  for (let i = 0; i < data.length; i += 4) {
    if (data[i] === 1) {
      data[data[i + 3]] = data[data[i + 1]] + data[data[i + 2]];
    } else if (data[i] === 2) {
      data[data[i + 3]] = data[data[i + 1]] * data[data[i + 2]];
    } else if (data[i] === 99) {
      break;
    } else {
      continue;
    }
  }

  return data[0];
}

function runIntcode(program: number[], noun: number, verb: number): number {
  const data = [...program];

  data[1] = noun;
  data[2] = verb;

  for (let i = 0; i < data.length; i += 4) {
    const opcode = data[i];

    if (opcode === 1) {
      data[data[i + 3]] = data[data[i + 1]] + data[data[i + 2]];
    } else if (opcode === 2) {
      data[data[i + 3]] = data[data[i + 1]] * data[data[i + 2]];
    } else if (opcode === 99) {
      break;
    } else {
      continue;
    }
  }

  return data[0];
}

function findNounVerb(program: number[], target: number): number {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const output = runIntcode(program, noun, verb);

      if (output === target) {
        return 100 * noun + verb;
      }
    }
  }

  return 0;
}

const input = await readTextFile("./2019/assets/day2.txt");
const data = input.split(",").map(Number);

const p1 = getValAtPosZero(data);
console.log(p1);

const p2 = findNounVerb(data, 19690720);
console.log(p2);
