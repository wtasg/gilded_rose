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
    try {
        const password = lines.reduce(({ pos, pass }, current) => {
            const direction = current[0] === "L" ? -1 : 1;
            const steps = parseInt(current.slice(1));
            pos += steps * direction;
            pos = pos % 100;
            if (Number.isNaN(pos)) {
                // console.log({ current, direction, steps, pos, next: pos + (steps * direction), pass });
            }
            if (pos === 0) {
                pass++;
            }
            return { pos, pass };
        }, { pos: start_pos, pass: 0 });
        // console.log(password);
        return password;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

function runner() {
    const lines = getData();
    const output = solution(lines, initial_position);
    // console.log({ output });
    return output;
}

runner();

module.exports = {
    solution,
    getData,
    runner,
};
