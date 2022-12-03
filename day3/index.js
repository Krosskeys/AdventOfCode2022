"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const lib_1 = require("../lib/lib");
function sortBP(backpack) {
    let dupe = 'empty';
    backpack.packL.forEach((v) => { if (backpack.packR.has(v)) {
        dupe = v;
    } });
    return dupe;
}
function assignItemPriority(item) {
    const charCode = item.charCodeAt(0);
    return charCode - (charCode < 97 ? 38 : 96);
}
function splitBP(backpacks) {
    return backpacks.map((v) => {
        const splitPoint = v.length / 2;
        return {
            packL: new Set(v.substring(0, splitPoint)),
            packR: new Set(v.substring(splitPoint))
        };
    });
}
function findBadges(elves) {
    const elvesMut = [...elves];
    const groups = [];
    while (elvesMut.length > 0) {
        groups.push(elvesMut.splice(0, 3));
    }
    let badges = [];
    groups.forEach((v) => {
        new Set(v[0].split('')).forEach((item) => {
            if ((v[1].indexOf(item) != -1) && (v[2].indexOf(item) != -1)) {
                badges.push(item);
            }
        });
    });
    return badges;
}
function sumPriority(items) {
    let total = 0;
    items.forEach((v) => total += assignItemPriority(v));
    return total;
}
const data = fs.readFileSync('data.txt', { encoding: 'utf8' });
const splitter = (0, lib_1.splitDumpByLine)(data);
console.info('Total Resort Priority: ' + sumPriority(splitBP(splitter).map((v) => sortBP(v))));
console.info('Total Badge Priority: ' + sumPriority(findBadges(splitter)));
