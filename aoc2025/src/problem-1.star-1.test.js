
const { solution } = require("./problem-1.star-1");

const sample_input = [
    "L68",
    "L30",
    "R48",
    "L5",
    "R60",
    "L55",
    "L1",
    "L99",
    "R14",
    "L82",
];


describe("Problem 1 Star 1", () => {
    describe("solution", () => {
        it("is 3 for sample input", () => {
            const expected = 3;
            const actual = solution(sample_input).pass;
            expect(actual).toEqual(expected);
        });
    })
});
