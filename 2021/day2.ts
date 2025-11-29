import { readTextFile } from "../utils.ts";

function calculatePosition(
  data: Array<{ dir: "up" | "down" | "forward"; value: number }>,
): number {
  const total = {
    forward: 0,
    up: 0,
    down: 0,
  };

  for (const movement of data) {
    total[movement.dir] += movement.value;
  }

  return total.forward * (total.down - total.up);
}

function calculatePosition2(
  data: Array<{ dir: "up" | "down" | "forward"; value: number }>,
): number {
  const total = {
    forward: 0,
    up: 0,
    down: 0,
    depth: 0,
  };

  for (const movement of data) {
    total[movement.dir] += movement.value;
    if (movement.dir === "forward")
      total.depth += (total.down - total.up) * movement.value;
  }

  return total.forward * total.depth;
}

const input = await readTextFile("./2021/assets/day2.txt");
const data = input.split("\n").map((row) => {
  const arr = row.split(" ");
  return { dir: arr[0], value: Number(arr[1]) };
});

const p1 = calculatePosition(data);
console.log(p1);

const p2 = calculatePosition2(data);
console.log(p2);
