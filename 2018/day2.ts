import { readTextFile } from "../utils.ts";

function getChecksum(data: string[]): number {
  let count2 = 0;
  let count3 = 0;

  for (const row of data) {
    const charCount = {};

    for (const char of row) {
      if (char in charCount) {
        charCount[char] += 1;
      } else {
        charCount[char] = 1;
      }
    }

    let count2Added = false;
    let count3Added = false;
    for (const val of Object.values(charCount)) {
      if (val == 2 && !count2Added) {
        count2Added = true;
        count2++;
      } else if (val == 3 && !count3Added) {
        count3Added = true;
        count3++;
      }
    }
  }

  return count2 * count3;
}

function commonBetween2Boxes(data: string[]): string {
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      const str1 = data[i];
      const str2 = data[j];

      let common = "";
      for (let k = 0; k < str1.length; k++) {
        if (str1[k] === str2[k]) common += str1[k];
      }

      if (common.length === str1.length - 1) return common;
    }
  }

  return "";
}

const input = await readTextFile("./2018/assets/day2.txt");
const data = input.split("\n");

const p1 = getChecksum(data);
console.log(p1);

const p2 = commonBetween2Boxes(data);
console.log(p2);
