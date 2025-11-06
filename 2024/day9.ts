import { readTextFile } from "../utils.ts";

function getChecksum(input: string): number {
    let x = 0;
    let blocks = '';

    for (let i = 0; i < input.length; i++) {
        const isEven = i % 2 === 0;
        const toAppend = isEven ? x : '.';

        for (let j = 0; j < Number(input[i]); j++) {
            blocks += toAppend;
        }

        if (isEven) x++;
    }

    let i = 0;
    let j = blocks.length - 1;
    const arrBlocks = blocks.split('');
    
    while (i < j) {
        if (arrBlocks[i] !== '.') {
            i++;
            continue;
        }

        if (arrBlocks[j] === '.') {
            j--;
            continue;
        }

        if (arrBlocks[i] === '.') {
            arrBlocks[i] = arrBlocks[j];
            arrBlocks[j] = '.'
        }

        i++;
        j--;
    }

    let res = 0;
    for (let k = 0; k < arrBlocks.length; k++) {
        if (arrBlocks[k] === '.') break;
        res += Number(arrBlocks[k]) * k;
    }

    return res;
}

const input = await readTextFile("./2024/assets/day9.txt");

const p1 = getChecksum(input);
console.log(p1);