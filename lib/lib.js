"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitDumpBySpace = exports.splitDumpByLine = void 0;
function splitDumpByLine(dump) {
    return dump.split('\n');
}
exports.splitDumpByLine = splitDumpByLine;
function splitDumpBySpace(dump) {
    return dump.split(' ');
}
exports.splitDumpBySpace = splitDumpBySpace;
