const { readFileSync, existsSync } = require("node:fs");
const { join } = require("node:path");

const input_filename = "problem-3.txt";
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
    // const lines = [
    //     "987654321111111",
    //     "811111111111119",
    //     "234234234234278",
    //     "818181911112111",
    // ];
    return lines;
}

function logic(input = []) {
    // console.log(input);
    let leftMax = Array.from({ length: input.length });
    for (let i = 0; i < input.length; i++) {
        leftMax[i] = Math.max(leftMax[i - 1] || 0, input[i]);
    }
    let rightMax = Array.from({ length: input.length });
    for (let i = input.length - 1; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1] || 0, input[i]);
    }
    let max = 0;
    // console.log({ leftMax, rightMax });
    for (let i = 0; i < input.length - 1; i++) {
        let current = "" + leftMax[i] + rightMax[i + 1];
        // console.log({ current, max })
        max = current > max ? current : max;
    }
    return max;
}

function solution(input = [], start_pos = initial_position) {
    // console.log(input);
    let out = initial_position;
    for (let i = 0; i < input.length; i++) {
        const x = logic(input[i].split(""));
        // console.log({ x, v: input[i] });
        out += parseInt(x);
    }
    return out;
}

function runner() {
    const lines = getData().filter(x => x.length > 0);
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
