const { test, expect, beforeEach } = require("@jest/globals");
const { Item, Shop } = require("./gilded_rose.js");
// test("2+2=4", () => {
//     expect(2 + 2).toBe(4);
// });

const ALL_ITEMS = [
    new Item("+5 Dexterity Vest", 10, 20),
    new Item("Aged Brie", 2, 0),
    new Item("Elixir of the Mongoose", 5, 7),
    new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),

    // This Conjured item does not work properly yet
    new Item("Conjured Mana Cake", 3, 6),
];

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
            quality: 50
        },
        {
            name: 'Backstage passes to a TAFKAL80ETC concert',
            sellIn: 4,
            quality: 50
        },
        { name: 'Conjured Mana Cake', sellIn: 2, quality: 5 }
    ];
    const shop = new Shop(ALL_ITEMS);
    const actuals = shop.updateQuality();
    // console.log({ actual });
    actuals.forEach((item, index) => {
        expect(item.name).toEqual(expected[index].name);
        expect(item.sellIn).toEqual(expected[index].sellIn);
        expect(item.quality).toEqual(expected[index].quality);
    });
});


test("Ten updates of quality", () => {
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
        { name: 'Conjured Mana Cake', sellIn: -8, quality: 0 }
    ];
    let shop = new Shop(ALL_ITEMS);
    for (let i = 0; i < 9; i++) {
        shop = new Shop(shop.updateQuality());
    }
    const actuals = shop.updateQuality();
    // console.log({ actual });
    // expect(actual).toEqual(expected);
    actuals.forEach((item, index) => {
        expect(item.name).toEqual(expected[index].name);
        expect(item.sellIn).toEqual(expected[index].sellIn);
        expect(item.quality).toEqual(expected[index].quality);
    });
});
