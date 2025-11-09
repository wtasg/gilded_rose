const { describe, it, expect } = require("@jest/globals");

const { Item, Shop } = require("./gilded_rose.js");

describe("Item", () => {
    it("creates an object with given values", () => {
        const name = "name";
        const sellIn = "sellIn";
        const quality = "quality";
        const item = new Item(name, sellIn, quality);
        expect(item.name).toEqual(name);
        expect(item.sellIn).toEqual(sellIn);
        expect(item.quality).toEqual(quality);
        expect(item instanceof Item).toBe(true);
    });
});

describe("Shop", () => {
    it("creates an object with with empty items list", () => {
        const items = [];
        const shop = new Shop(items);
        expect(shop instanceof Shop).toBe(true);
        const actual = shop.updateQuality();
        expect(actual.length).toEqual(0);
        expect(Array.isArray(actual)).toBe(true);
    });
});
