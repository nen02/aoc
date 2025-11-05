import { readTextFile } from "../utils.ts";

function calculatePoints(data: string): number {
  const cards = data.split("\n");
  let res = 0;

  for (const card of cards) {
    let points = 0;

    const [winningNums, myNums] = card
      .replace(/Card\s*\d+:\s/, "")
      .split(" | ");

    const arrWinningNums = winningNums.trim().split(/\s+/).map(Number);
    const arrMyNums = myNums.trim().split(/\s+/).map(Number);

    for (const num of arrMyNums) {
      if (!arrWinningNums.includes(num)) continue;

      points = !points ? 1 : points * 2;
    }

    res += points;
  }

  return res;
}

function totalScratchcards(data: string): number {
  const cards = data.split("\n");

  const cardCounts = Array.from({ length: cards.length }, () => 1);

  for (const [index, card] of cards.entries()) {
    const [winningNums, myNums] = card
      .replace(/Card\s*\d+:\s/, "")
      .split(" | ");

    const arrWinningNums = winningNums.trim().split(/\s+/).map(Number);
    const arrMyNums = myNums.trim().split(/\s+/).map(Number);

    const totalMatches = arrMyNums.reduce((total, current) => {
      return arrWinningNums.includes(current) ? total + 1 : total;
    }, 0);

    for (let i = 1; i <= totalMatches; i++) {
      cardCounts[index + i] += cardCounts[index];
    }
  }

  return cardCounts.reduce((total, current) => total + current, 0);
}

const input = await readTextFile("./2023/assets/day4.txt");

const p1 = calculatePoints(input);
console.log(p1);

const p2 = totalScratchcards(input);
console.log(p2);
