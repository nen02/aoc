import { readTextFile } from "../utils.ts";

function canReachTarget(
  target: number,
  nums: number[],
  i = 1,
  current = nums[0],
): boolean {
  if (i === nums.length) return current === target;

  const next = nums[i];
  return (
    canReachTarget(target, nums, i + 1, current + next) ||
    canReachTarget(target, nums, i + 1, current * next)
  );
}

function canReachTargetWithConcat(
  target: number,
  nums: number[],
  i = 1,
  current = nums[0],
): boolean {
  if (i === nums.length) return current === target;

  const next = nums[i];
  const concat = Number(current + "" + next);
  return (
    canReachTargetWithConcat(target, nums, i + 1, current + next) ||
    canReachTargetWithConcat(target, nums, i + 1, current * next) ||
    canReachTargetWithConcat(target, nums, i + 1, concat)
  );
}

function totalCalibration(data: Array<[number, number[]]>): number {
  let total = 0;

  for (const [target, nums] of data)
    if (canReachTarget(target, nums)) total += target;

  return total;
}

function totalCalibrationWithConcat(data: Array<[number, number[]]>): number {
  let total = 0;

  for (const [target, nums] of data)
    if (canReachTargetWithConcat(target, nums)) total += target;

  return total;
}

const input = await readTextFile("./2024/assets/day7.txt");
const data: Array<[number, number[]]> = input
  .split("\n")
  .map((row) => row.split(": "))
  .map((row) => [Number(row[0]), row[1].split(" ").map(Number)]);

const p1 = totalCalibration(data);
console.log(p1);

const p2 = totalCalibrationWithConcat(data);
console.log(p2);
