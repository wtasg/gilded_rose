const { twoSum } = require("./2sum.js");

describe("2sum", () => {
    it("returns [-1,-1] when there is no input", () => {
        const expected = [-1, -1];
        const actual = twoSum();
        expect(actual).toEqual(expected);
    });
    it("returns [-1,-1] when input is not correct", () => {
        const expected = [-2, -2];
        const actual = twoSum("asd", "ASd");
        expect(actual).toEqual(expected);
    });
    it("returns [-1,-1] when numbers is 0 length", () => {
        const expected = [-3, -3];
        const actual = twoSum([], 1);
        expect(actual).toEqual(expected);
    });
    it("returns [0, 1] correctly", () => {
        const expected = [0, 1];
        const actual = twoSum([3, 3, 6], 6);
        expect(actual).toEqual(expected);
    });
});
