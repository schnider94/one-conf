const fs = require('fs');
const { resolve } = require('path');

const file = resolve(process.cwd(), process.argv[2]);
const rawdata = fs.readFileSync(file);
const iperf = JSON.parse(rawdata);

let csv = 'interval;bytes;bits_per_second\n';

iperf.intervals.forEach(function(val) {
    csv += `${Math.floor(parseInt(val.sum.end))};${parseFloat(val.sum.bytes)};${parseFloat(val.sum.bits_per_second)}\n`.replace(/\./g, ',');
});

fs.writeFile('output.csv', csv, function() {
    console.log('Success');
});
