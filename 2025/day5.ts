import { readTextFile } from "../utils.ts";

function solution1(ranges: number[][], nums: number[]): number {
  let res = 0;

  for (const num of nums) {
    if (ranges.some(([start, end]) => num >= start && num <= end)) res++;
  }

  return res;
}

function solution2(ranges: number[][]): number {
  ranges.sort((a, b) => a[0] - b[0]);

  const merged: number[][] = [];
  let [start, end] = ranges[0];

  for (let i = 1; i < ranges.length; i++) {
    const [s, e] = ranges[i];

    if (s <= end + 1) {
      end = Math.max(end, e);
    } else {
      merged.push([start, end]);
      start = s;
      end = e;
    }
  }

  merged.push([start, end]);

  return merged.reduce((total, [s, e]) => total + e - s + 1, 0);
}

const input = await readTextFile("./2025/assets/day5.txt");
const data = input.split("\n\n");

const ranges = data[0].split("\n").map((row) => row.split("-").map(Number));
const nums = data[1].split("\n").map(Number);

const p1 = solution1(ranges, nums);
console.log(p1);

const p2 = solution2(ranges);
console.log(p2);
