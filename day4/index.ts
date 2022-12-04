import * as fs from 'fs';
import { splitDumpByLine } from '../lib/lib';


const data = fs.readFileSync('data.txt', { encoding: 'utf8' });
function tween(test, bounds) {return test >= bounds[0] && test <=bounds[1] ? true : false;}
const elfPairs = splitDumpByLine(data).map(va => va.split(',').map(vb => vb.split('-').map((vc => +vc))));
console.log("CONTAINED PAIRS:" + elfPairs.filter(v => (v[0][0] >= v[1][0] && v[0][1] <= v[1][1]) || (v[1][0] >= v[0][0] && v[1][1] <= v[0][1]) || v[0].every((vb,i) => vb === v[1][i])).length);
console.log("OVERLAPPING PAIRS:" + elfPairs.filter(v => tween(v[0][0], v[1]) || tween(v[0][1], v[1]) || v[0][0] <= v[1][0] && v[0][1] >= v[1][1]).length);

