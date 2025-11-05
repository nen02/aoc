import { readTextFile } from "../utils.ts";

const pointsPerCount = {
  5: 100,
  4: 50,
  3: 30,
  2: 10,
  1: 1,
};

function totalWinnings(sets: Array<{ cards: string; bid: string }>): number {
  const cardValues = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    T: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
  };
  const points = Array.from({ length: sets.length }, () => 0);

  for (const [index, { cards }] of sets.entries()) {
    const counter: Record<string, number> = {};

    for (const card of cards) {
      if (counter[card]) counter[card]++;
      else counter[card] = pointsPerCount[1];
    }

    for (const count of Object.values(counter)) {
      points[index] += pointsPerCount[count];
    }
  }

  const setsWithPoints: Array<[string, string, number]> = sets
    .map((set, index): [string, string, number] => [
      set.cards,
      set.bid,
      points[index],
    ])
    .sort((a, b) => {
      if (a[2] !== b[2]) return a[2] > b[2] ? 1 : -1;

      for (let i = 0; i < a[0].length; i++) {
        if (cardValues[a[0][i]] !== cardValues[b[0][i]]) {
          return cardValues[a[0][i]] > cardValues[b[0][i]] ? 1 : -1;
        }
      }

      return 0;
    });

  return setsWithPoints.reduce(
    (total, current, index) => total + (index + 1) * Number(current[1]),
    0
  );
}

function totalWinningsWithJoker(
  sets: Array<{ cards: string; bid: string }>
): number {
  const cardValues = {
    J: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    T: 10,
    Q: 12,
    K: 13,
    A: 14,
  };

  const points = Array.from({ length: sets.length }, () => 0);

  for (const [index, { cards }] of sets.entries()) {
    const counter: Record<string, number> = {};
    let jokerCount = 0;

    for (const card of cards) {
      if (card === "J") {
        jokerCount++;
        continue;
      }

      if (counter[card]) counter[card]++;
      else counter[card] = pointsPerCount[1];
    }

    const sortedCards = Object.entries(counter).sort((a, b) => {
      if (a[1] !== b[1]) return a[1] < b[1] ? 1 : -1;
      if (a[0] !== b[0]) return cardValues[a[0]] < cardValues[b[0]] ? 1 : -1;

      return 0;
    });

    if (sortedCards.length) {
      sortedCards[0][1] += jokerCount;
    } else {
      sortedCards.push(["A", 5]);
    }

    for (const count of sortedCards) {
      points[index] += pointsPerCount[count[1]];
    }
  }

  const setsWithPoints: Array<[string, string, number]> = sets
    .map((set, index): [string, string, number] => [
      set.cards,
      set.bid,
      points[index],
    ])
    .sort((a, b) => {
      if (a[2] !== b[2]) return a[2] > b[2] ? 1 : -1;

      for (let i = 0; i < a[0].length; i++) {
        if (cardValues[a[0][i]] !== cardValues[b[0][i]]) {
          return cardValues[a[0][i]] > cardValues[b[0][i]] ? 1 : -1;
        }
      }

      return 0;
    });

  return setsWithPoints.reduce(
    (total, current, index) => total + (index + 1) * Number(current[1]),
    0
  );

  return 0;
}

const input = await readTextFile("./2023/assets/day7.txt");
const sets = input
  .split("\n")
  .map((card) => card.split(" "))
  .map((set) => ({ cards: set[0], bid: set[1] }));

// const p1 = totalWinnings(sets);
// console.log(p1);

const p2 = totalWinningsWithJoker(sets);
console.log(p2);
