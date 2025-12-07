const { readFileSync, existsSync } = require("node:fs");
const { join } = require("node:path");

const input_filename = "problem-1.input-1.txt";
const input_filepath = join(__dirname, input_filename);
const initial_position = 50;

function getData() {
    if (!existsSync(input_filepath)) {
        throw new Error("File does not exist.");
    }
    const lines = readFileSync(input_filepath)
        .toString()
        .split("\n")
        .filter(val => val.length > 0);
    // console.log(lines);
    return lines;
}

function solution(lines = [], start_pos = initial_position) {
    let countClickedZero = 0;
    let pos = start_pos;
    lines.filter(l => l.trim().length > 0)
        .map(line => {
            const multiplier = line[0] === "L" ? -1 : 1;
            return multiplier * parseInt(line.slice(1));
        })
        .forEach((value) => {
            const next = value + pos;
            if (next % 100 === 0) {
                countClickedZero++;
            }
            countClickedZero += (next < 0) ?
                Math.ceil(next / 100) :
                Math.floor(next / 100);
            pos = next % 100;
            if (pos < 0) {
                pos = 100 - pos;
            }
        });

    return countClickedZero;
}

function runner() {
    const lines = getData();
    const output = solution(lines, initial_position);
    console.log({ output });
    return output;
}

runner();

module.exports = {
    solution,
    getData,
    runner,
};
