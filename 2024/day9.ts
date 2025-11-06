import { readTextFile } from "../utils.ts";

function getChecksum(input: string): number {
  let x = 0;
  const blocks: Array<number | string> = [];

  for (let i = 0; i < input.length; i++) {
    const isEven = i % 2 === 0;
    const toAppend = isEven ? x : ".";

    for (let j = 0; j < Number(input[i]); j++) {
      blocks.push(toAppend);
    }

    if (isEven) x++;
  }

  let i = 0;
  let j = blocks.length - 1;

  while (i <= j) {
    while (blocks[i] !== "." && i < j) i++;
    while (blocks[j] === "." && i < j) j--;

    if (i >= j) break;

    blocks[i] = blocks[j];
    blocks[j] = ".";
    i++;
  }

  let res = 0;
  for (let k = 0; k < blocks.length; k++) {
    const val = blocks[k];

    if (typeof val !== "number") break;
    res += val * k;
  }

  return res;
}

function getChecksumP2(input: string): number {
  let x = 0;
  const blocks: Array<number | string> = [];

  const numLen: Array<{ key: number; len: number; index: number }> = [];
  const spaceLen: Array<{ index: number; len: number }> = [];

  for (let i = 0; i < input.length; i++) {
    const isEven = i % 2 === 0;
    const toAppend = isEven ? x : ".";

    const num = Number(input[i]);

    if (isEven) {
      numLen.push({ key: x, len: num, index: blocks.length });
    } else {
      spaceLen.push({ index: blocks.length, len: num });
    }

    for (let j = 0; j < num; j++) {
      blocks.push(toAppend);
    }

    if (isEven) x++;
  }

  for (let i = numLen.length - 1; i >= 0; i--) {
    for (let j = 0; j < spaceLen.length; j++) {
      if (numLen[i].len > spaceLen[j].len) continue;
      if (spaceLen[j].index >= numLen[i].index) continue;

      for (let k = 0; k < numLen[i].len; k++) {
        blocks[spaceLen[j].index + k] = numLen[i].key;
        blocks[numLen[i].index + k] = ".";
      }

      spaceLen[j].index += numLen[i].len;
      spaceLen[j].len -= numLen[i].len;

      if (spaceLen[j].len === 0) {
        spaceLen.splice(j, 1);
        j--;
      }

      break;
    }
  }

  let res = 0;
  for (let k = 0; k < blocks.length; k++) {
    const val = blocks[k];

    if (typeof val !== "number") continue;
    res += val * k;
  }

  return res;
}

const input = await readTextFile("./2024/assets/day9.txt");

const p1 = getChecksum(input);
console.log(p1);

const p2 = getChecksumP2(input);
console.log(p2);
