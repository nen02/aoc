import { readTextFile } from "../utils.ts";

function calibrateValues(calibrationDoc: string) {
  const rows = calibrationDoc.split("\n");

  let total = 0;

  for (const row of rows) {
    const len = row.length - 1;

    let index = 0;
    let fd: null | string = null,
      ld = null;

    while (!fd || !ld) {
      if (!fd && !isNaN(parseInt(row[index]))) {
        fd = row[index];
      }

      if (!ld && !isNaN(parseInt(row[len - index]))) {
        ld = row[len - index];
      }

      index++;
    }

    total += Number(`${fd}${ld}`);
  }

  return total;
}

function calibrateValuesWithWords(calibrationDoc: string) {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const numbersInWords = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  function replaceWordWithDigit(numberInWord: string): string {
    const index = numbersInWords.indexOf(numberInWord);
    return index === -1 ? numberInWord : numbers[index];
  }

  const regex = new RegExp(
    `(?=(${[...numbersInWords, ...numbers].join("|")}))`,
    "g"
  );
  let total = 0;

  for (const row of calibrationDoc.split("\n")) {
    const matches = Array.from(row.matchAll(regex), (m) => m[1]);

    const first = replaceWordWithDigit(matches[0] ?? "0");
    const last = replaceWordWithDigit(matches[matches.length - 1] ?? "0");

    total += Number(first + last);
  }

  return total;
}

const input = await readTextFile("./2023/assets/day1.txt");

const p1 = calibrateValues(input);
console.log(p1);
const p2 = calibrateValuesWithWords(input);
console.log(p2);
