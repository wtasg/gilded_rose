const {atoi} = require("./atoi.js");

describe("atoi", () => {
    it("returns 0 when input string is null, undefined, or empty", () => {
        expect(atoi(null)).toBe(0);
        expect(atoi(undefined)).toBe(0);
        expect(atoi("")).toBe(0);
        expect(atoi(10)).toBe(0);
    });
    it("returns smallest number correctly", () => {
        expect(atoi("-91283472332")).toBe(-2147483648);
        expect(atoi(Number.MIN_SAFE_INTEGER.toString())).toBe(-2147483648);
        // Already oveflowed and wrapped around for JS numbers
        // expect(atoi(Number.MIN_VALUE.toString())).toBe(-2147483648);
    });
    it("returns largest number correctly", () => {
        expect(atoi("91283472332")).toBe(2147483647);
        expect(atoi(Number.MAX_SAFE_INTEGER.toString())).toBe(2147483647);
        // Already oveflowed and wrapped around for JS numbers
        // expect(atoi(Number.MAX_VALUE.toString())).toBe(2147483647);
    });
    it("returns 0 for '0'", () => {
        expect(atoi("0")).toBe(0);
    });
    it("returns 0 for '0xDeadBeat'", () => {
        expect(atoi("0xDeadBeat")).toBe(0);
    });
    it("returns 42 for '042'", () => {
        expect(atoi("042")).toBe(42);
    });
    it("returns 42 for '42'", () => {
        expect(atoi("42")).toBe(42);
    });
    it("returns -42 for '-42'", () => {
        expect(atoi("-42")).toBe(-42);
    });
    it("returns 0 for '--42' and it's variations", () => {
        expect(atoi("--42")).toBe(0);
        expect(atoi("-+42")).toBe(0);
        expect(atoi("+-42")).toBe(0);
        expect(atoi("++42")).toBe(0);
    });
    it("returns 0 for '000000' and it's variations", () => {
        expect(atoi("000000000")).toBe(0);
        expect(atoi("-000000000")).toBe(0);
        expect(atoi("+000000000")).toBe(0);
    });
    it("returns 0 for '-' and it's variations", () => {
        expect(atoi("-")).toBe(0);
        expect(atoi("----")).toBe(0);
        expect(atoi("+")).toBe(0);
        expect(atoi("++++")).toBe(0);
    });
});
