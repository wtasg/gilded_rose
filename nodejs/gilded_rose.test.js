const { test, expect, beforeEach } = require("@jest/globals");
const { Item, Shop } = require("./gilded_rose.js");
//     expect(2 + 2).toBe(4);
// });

let ALL_ITEMS;
beforeEach(() => {
    ALL_ITEMS = [
        new Item("+5 Dexterity Vest", 10, 20),
        new Item("Aged Brie", 2, 0),
        new Item("Elixir of the Mongoose", 5, 7),
        new Item("Sulfuras, Hand of Ragnaros", 0, 80),
        new Item("Sulfuras, Hand of Ragnaros", -1, 80),
        new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 45),
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 45),

        // This Conjured item does not work properly yet
        new Item("Conjured Mana Cake", 3, 6),

        new Item("", 3, 6),
        new Item("      ", -3, -6),
        new Item(-3, "accidental sellin", -6),

        new Item("Conjured Mana Cake", 4, 7),
        new Item("Aged Brie", 1, 49),
        new Item("Aged Brie", 0, 49),
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 45),
    ];
});


test("One update of quality", () => {
    const expected = [
        { name: '+5 Dexterity Vest', sellIn: 9, quality: 19 },
        { name: 'Aged Brie', sellIn: 1, quality: 1 },
        { name: 'Elixir of the Mongoose', sellIn: 4, quality: 6 },
        { name: 'Sulfuras, Hand of Ragnaros', sellIn: 0, quality: 80 },
        {
            name: 'Sulfuras, Hand of Ragnaros',
            sellIn: -1,
            quality: 80
        },
        {
            name: 'Backstage passes to a TAFKAL80ETC concert',
            sellIn: 14,
            quality: 21
        },
        {
            name: 'Backstage passes to a TAFKAL80ETC concert',
            sellIn: 9,
            quality: 47
        },
        {
            name: 'Backstage passes to a TAFKAL80ETC concert',
            sellIn: 4,
            quality: 48
        },
        { name: 'Conjured Mana Cake', sellIn: 2, quality: 5 },
        { name: 'Conjured Mana Cake', sellIn: 3, quality: 6 },
        { name: 'Aged Brie', sellIn: 0, quality: 50 },
        { name: 'Aged Brie', sellIn: -1, quality: 50 },
        {
            name: 'Backstage passes to a TAFKAL80ETC concert',
            sellIn: -1,
            quality: 0
        },
    ];
    const shop = new Shop(ALL_ITEMS.map(({ name, sellIn, quality }) => new Item(name, sellIn, quality)));
    const actuals = shop.updateQuality();
    // console.log({ actual });
    actuals.forEach((item, index) => {
        expect(item.name).toEqual(expected[index].name);
        expect(item.sellIn).toEqual(expected[index].sellIn);
        expect(item.quality).toEqual(expected[index].quality);
    });
});

test("2 One update of quality", () => {
    const expected = [
        { name: '+5 Dexterity Vest', sellIn: 9, quality: 19 },
        { name: 'Aged Brie', sellIn: 1, quality: 1 },
        { name: 'Elixir of the Mongoose', sellIn: 4, quality: 6 },
        { name: 'Sulfuras, Hand of Ragnaros', sellIn: 0, quality: 80 },
        {
            name: 'Sulfuras, Hand of Ragnaros',
            sellIn: -1,
            quality: 80
        },
        {
            name: 'Backstage passes to a TAFKAL80ETC concert',
            sellIn: 14,
            quality: 21
        },
        {
            name: 'Backstage passes to a TAFKAL80ETC concert',
            sellIn: 9,
            quality: 47
        },
        {
            name: 'Backstage passes to a TAFKAL80ETC concert',
            sellIn: 4,
            quality: 48
        },
        { name: 'Conjured Mana Cake', sellIn: 2, quality: 5 },
        { name: 'Conjured Mana Cake', sellIn: 3, quality: 6 },
        { name: 'Aged Brie', sellIn: 0, quality: 50 },
        { name: 'Aged Brie', sellIn: -1, quality: 50 },
        {
            name: 'Backstage passes to a TAFKAL80ETC concert',
            sellIn: -1,
            quality: 0
        },
    ];
    const shop = new Shop(ALL_ITEMS.map(({ name, sellIn, quality }) => new Item(name, sellIn, quality)));
    const actuals = shop.updateQuality();
    // console.log({ actual });
    actuals.forEach((item, index) => {
        expect(item.name).toEqual(expected[index].name);
        expect(item.sellIn).toEqual(expected[index].sellIn);
        expect(item.quality).toEqual(expected[index].quality);
    });
});


test("Eleven updates of quality", () => {
    const expected = [
        { name: '+5 Dexterity Vest', sellIn: -1, quality: 8 },
        { name: 'Aged Brie', sellIn: -9, quality: 20 },
        { name: 'Elixir of the Mongoose', sellIn: -6, quality: 0 },
        { name: 'Sulfuras, Hand of Ragnaros', sellIn: 0, quality: 80 },
        {
            name: 'Sulfuras, Hand of Ragnaros',
            sellIn: -1,
            quality: 80
        },
        {
            name: 'Backstage passes to a TAFKAL80ETC concert',
            sellIn: 4,
            quality: 38
        },
        {
            name: 'Backstage passes to a TAFKAL80ETC concert',
            sellIn: -1,
            quality: 0
        },
        {
            name: 'Backstage passes to a TAFKAL80ETC concert',
            sellIn: -6,
            quality: 0
        },
        { name: 'Conjured Mana Cake', sellIn: -8, quality: 0 },
        { name: 'Conjured Mana Cake', sellIn: -7, quality: 0 },
        { name: 'Aged Brie', sellIn: -10, quality: 50 },
        { name: 'Aged Brie', sellIn: -11, quality: 50 },
        {
            name: 'Backstage passes to a TAFKAL80ETC concert',
            sellIn: -11,
            quality: 0
        },
    ];
    let shop = new Shop(ALL_ITEMS.map(({ name, sellIn, quality }) => new Item(name, sellIn, quality)));
    for (let i = 0; i < 10; i++) {
        shop = new Shop(shop.updateQuality().map(({ name, sellIn, quality }) => new Item(name, sellIn, quality)));
    }
    const actuals = shop.updateQuality().map(({ name, sellIn, quality }) => new Item(name, sellIn, quality));
    // console.log({ actual });
    // expect(actual).toEqual(expected);
    actuals.forEach((item, index) => {
        expect(item.name).toEqual(expected[index].name);
        expect(item.sellIn).toEqual(expected[index].sellIn);
        expect(item.quality).toEqual(expected[index].quality);
    });
});
