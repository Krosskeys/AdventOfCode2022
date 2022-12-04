"use strict";
exports.__esModule = true;
var fs = require("fs");
var lib_1 = require("../lib/lib");
var data = fs.readFileSync('data.txt', { encoding: 'utf8' });
function tween(test, bounds) { return test >= bounds[0] && test <= bounds[1] ? true : false; }
var elfPairs = (0, lib_1.splitDumpByLine)(data).map(function (va) { return va.split(',').map(function (vb) { return vb.split('-').map((function (vc) { return +vc; })); }); });
console.log("CONTAINED PAIRS:" + elfPairs.filter(function (v) { return (v[0][0] >= v[1][0] && v[0][1] <= v[1][1]) || (v[1][0] >= v[0][0] && v[1][1] <= v[0][1]) || v[0].every(function (vb, i) { return vb === v[1][i]; }); }).length);
console.log("OVERLAPPING PAIRS:" + elfPairs.filter(function (v) { return tween(v[0][0], v[1]) || tween(v[0][1], v[1]) || v[0][0] <= v[1][0] && v[0][1] >= v[1][1]; }).length);
