import * as fs from 'fs';
import { splitDumpByLine } from '../lib/lib';

interface Pack {
    packL: Set<string>,
    packR: Set<string>
}

function sortBP(backpack: Pack): string {
    let dupe = 'empty';
    backpack.packL.forEach((v) => { if (backpack.packR.has(v)) { dupe = v; } });
    return dupe;
}

function assignItemPriority(item: string): number {
    const charCode = item.charCodeAt(0);
    return charCode - (charCode < 97 ? 38 : 96);
}

function splitBP(backpacks: Array<string>) {
    return backpacks.map((v: string): Pack => {
        const splitPoint = v.length / 2;
        return {
            packL: new Set(v.substring(0, splitPoint)),
            packR: new Set(v.substring(splitPoint))
        }
    })
}

function findBadges(elves: Array<string>): Array<string> {
    const elvesMut = [...elves];
    const groups = [];
    while (elvesMut.length > 0) {
        groups.push(elvesMut.splice(0, 3));
    }
    let badges: Array<string> = [];
    groups.forEach((v) => {
        new Set(v[0].split('')).forEach((item) => {
            if ((v[1].indexOf(item) != -1) && (v[2].indexOf(item) != -1)) {
                badges.push(item);
            }
        })
    })
    return badges;
}

function sumPriority(items: Array<string>): number {
    let total = 0;
    items.forEach((v) => total += assignItemPriority(v));
    return total;
}

const data = fs.readFileSync('data.txt', { encoding: 'utf8' });
const splitter = splitDumpByLine(data);
console.info('Total Resort Priority: ' + sumPriority(splitBP(splitter).map((v) => sortBP(v))));
console.info('Total Badge Priority: ' + sumPriority(findBadges(splitter)));