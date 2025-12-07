const { readFileSync, existsSync } = require("node:fs");
const { join } = require("node:path");

const input_filename = "problem-2.input-1.txt";
const input_filepath = join(__dirname, input_filename);
const initial_position = 0;

function getData() {
    if (!existsSync(input_filepath)) {
        throw new Error("File does not exist.");
    }
    const lines = readFileSync(input_filepath)
        .toString()
        .split("\n")
        .filter(val => val.length > 0);
    // console.log(lines);
    // const lines = ["11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124"];
    return lines[0]
        .split(",")
        .map(x => x.trim())
        .filter(l => l.length > 0)
        .map(v => v.split("-").map(n => parseInt(n.trim())));
}

function isInvalid_1(input = "") {
    // console.log(input);
    if (input.length % 2 === 1) {
        return false;
    }
    const half = Math.floor(input.length / 2);
    return input.slice(0, half) === input.slice(half);
}

function split(input, at) {
    const out = [];
    for (let i = 0; i < input.length; i += at) {
        out.push(input.slice(i, i + at));
    }
    return out;
}

function isInvalid(input = "") {
    const len = input.length;
    let splitter = Math.floor(len / 2);
    while (splitter > 0) {
        const splitted = split(input, splitter);
        // console.log({ splitted });
        const slen = splitted.length;
        if (splitted.every(x => x === splitted[0])) {
            return true;
        }
        splitter--;
    }
    return false;
}

function solution(input = [], start_pos = initial_position) {
    let out = 0;
    for (let i = 0; i < input.length; i++) {
        const [start, end] = input[i];
        for (let j = start; j <= end; j++) {
            if (isInvalid(j.toString())) {
                out += j;
            }
        }
    }
    return out;
}

function runner() {
    const lines = getData();
    // console.log(lines);
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
