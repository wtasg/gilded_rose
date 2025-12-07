
const { solution } = require("./problem-1.star-2");

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


describe("Problem 1 Star 2", () => {
    describe("solution", () => {
        it("is 6 for sample input", () => {
            const expected = 6;
            const actual = solution(sample_input);
            expect(actual).toEqual(expected);
        });
    })
});
