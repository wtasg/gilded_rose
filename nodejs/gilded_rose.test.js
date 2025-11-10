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

    it("creates an object without items param", () => {
        const shop = new Shop();
        expect(shop instanceof Shop).toBe(true);
        const actual = shop.updateQuality();
        expect(actual.length).toEqual(0);
        expect(Array.isArray(actual)).toBe(true);
    });

    it("updates the quality correctly after one update", () => {
        const expected = [
            {
                "name": "+5 Dexterity Vest",
                "sellIn": 9,
                "quality": 19
            },
            {
                "name": "Aged Brie",
                "sellIn": 1,
                "quality": 1
            },
            {
                "name": "Elixir of the Mongoose",
                "sellIn": 4,
                "quality": 6
            },
            {
                "name": "Sulfuras, Hand of Ragnaros",
                "sellIn": 0,
                "quality": 80
            },
            {
                "name": "Sulfuras, Hand of Ragnaros",
                "sellIn": -1,
                "quality": 80
            },
            {
                "name": "Backstage passes to a TAFKAL80ETC concert",
                "sellIn": 14,
                "quality": 21
            },
            {
                "name": "Backstage passes to a TAFKAL80ETC concert",
                "sellIn": 9,
                "quality": 50
            },
            {
                "name": "Backstage passes to a TAFKAL80ETC concert",
                "sellIn": 4,
                "quality": 50
            },
            {
                "name": "Conjured Mana Cake",
                "sellIn": 2,
                "quality": 5
            }
        ];

        const items = [
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
        const shop = new Shop(items);
        const actual = shop.updateQuality();
        // console.log(JSON.stringify(actual, null, 4));
        expect(actual.length).toEqual(expected.length);
        actual.forEach((item, i) => {
            expect(item.name).toEqual(expected[i].name);
            expect(item.sellIn).toEqual(expected[i].sellIn);
            expect(item.quality).toEqual(expected[i].quality);
        });
    });

    it("updates the quality correctly after 10 updates", () => {
        const expected = [
            {
                "name": "+5 Dexterity Vest",
                "sellIn": -1,
                "quality": 8
            },
            {
                "name": "Aged Brie",
                "sellIn": -9,
                "quality": 20
            },
            {
                "name": "Elixir of the Mongoose",
                "sellIn": -6,
                "quality": 0
            },
            {
                "name": "Sulfuras, Hand of Ragnaros",
                "sellIn": 0,
                "quality": 80
            },
            {
                "name": "Sulfuras, Hand of Ragnaros",
                "sellIn": -1,
                "quality": 80
            },
            {
                "name": "Backstage passes to a TAFKAL80ETC concert",
                "sellIn": 4,
                "quality": 38
            },
            {
                "name": "Backstage passes to a TAFKAL80ETC concert",
                "sellIn": -1,
                "quality": 0
            },
            {
                "name": "Backstage passes to a TAFKAL80ETC concert",
                "sellIn": -6,
                "quality": 0
            },
            {
                "name": "Conjured Mana Cake",
                "sellIn": -8,
                "quality": 0
            }
        ];

        const items = [
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
        let shop = new Shop(items);
        for (let i = 0; i < 10; i++) {
            shop = new Shop(shop.updateQuality());
        }
        const actual = shop.updateQuality();
        // console.log(JSON.stringify(actual, null, 4));
        expect(actual.length).toEqual(expected.length);
        actual.forEach((item, i) => {
            expect(item.name).toEqual(expected[i].name);
            expect(item.sellIn).toEqual(expected[i].sellIn);
            expect(item.quality).toEqual(expected[i].quality);
        });
    });

    it("updates the quality correctly after 40 updates", () => {
        const expected = [
            {
                "name": "+5 Dexterity Vest",
                "sellIn": -31,
                "quality": 0
            },
            {
                "name": "Aged Brie",
                "sellIn": -39,
                "quality": 50
            },
            {
                "name": "Elixir of the Mongoose",
                "sellIn": -36,
                "quality": 0
            },
            {
                "name": "Sulfuras, Hand of Ragnaros",
                "sellIn": 0,
                "quality": 80
            },
            {
                "name": "Sulfuras, Hand of Ragnaros",
                "sellIn": -1,
                "quality": 80
            },
            {
                "name": "Backstage passes to a TAFKAL80ETC concert",
                "sellIn": -26,
                "quality": 0
            },
            {
                "name": "Backstage passes to a TAFKAL80ETC concert",
                "sellIn": -31,
                "quality": 0
            },
            {
                "name": "Backstage passes to a TAFKAL80ETC concert",
                "sellIn": -36,
                "quality": 0
            },
            {
                "name": "Conjured Mana Cake",
                "sellIn": -38,
                "quality": 0
            }
        ];

        const items = [
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
        let shop = new Shop(items);
        for (let i = 0; i < 40; i++) {
            shop = new Shop(shop.updateQuality());
        }
        const actual = shop.updateQuality();
        // console.log(JSON.stringify(actual, null, 4));
        expect(actual.length).toEqual(expected.length);
        actual.forEach((item, i) => {
            expect(item.name).toEqual(expected[i].name);
            expect(item.sellIn).toEqual(expected[i].sellIn);
            expect(item.quality).toEqual(expected[i].quality);
        });
    });

    it("updates the quality correctly after 100 updates", () => {
        const expected = [
            {
                "name": "+5 Dexterity Vest",
                "sellIn": -91,
                "quality": 0
            },
            {
                "name": "Aged Brie",
                "sellIn": -99,
                "quality": 50
            },
            {
                "name": "Elixir of the Mongoose",
                "sellIn": -96,
                "quality": 0
            },
            {
                "name": "Sulfuras, Hand of Ragnaros",
                "sellIn": 0,
                "quality": 80
            },
            {
                "name": "Sulfuras, Hand of Ragnaros",
                "sellIn": -1,
                "quality": 80
            },
            {
                "name": "Backstage passes to a TAFKAL80ETC concert",
                "sellIn": -86,
                "quality": 0
            },
            {
                "name": "Backstage passes to a TAFKAL80ETC concert",
                "sellIn": -91,
                "quality": 0
            },
            {
                "name": "Backstage passes to a TAFKAL80ETC concert",
                "sellIn": -96,
                "quality": 0
            },
            {
                "name": "Conjured Mana Cake",
                "sellIn": -98,
                "quality": 0
            }
        ];

        const items = [
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
        let shop = new Shop(items);
        for (let i = 0; i < 100; i++) {
            shop = new Shop(shop.updateQuality());
        }
        const actual = shop.updateQuality();
        // console.log(JSON.stringify(actual, null, 4));
        expect(actual.length).toEqual(expected.length);
        actual.forEach((item, i) => {
            expect(item.name).toEqual(expected[i].name);
            expect(item.sellIn).toEqual(expected[i].sellIn);
            expect(item.quality).toEqual(expected[i].quality);
        });
    });

    it("works with an item with empty name", () => {
        const item = new Item("", 10, 10);
        const items = [item];
        const shop = new Shop(items);
        const actual = shop.updateQuality();
        const expected = [{ name: '', sellIn: 9, quality: 9 }];
        // console.log(actual);
        expect(actual.length).toEqual(expected.length);
        actual.forEach((item, i) => {
            expect(item.name).toEqual(expected[i].name);
            expect(item.sellIn).toEqual(expected[i].sellIn);
            expect(item.quality).toEqual(expected[i].quality);
        });
    });

    it("works with an item with spaced name", () => {
        const item = new Item("  ", 10, 10);
        const items = [item];
        const shop = new Shop(items);
        const actual = shop.updateQuality();
        const expected = [{ name: "  ", sellIn: 9, quality: 9 }];
        // console.log(actual);
        expect(actual.length).toEqual(expected.length);
        actual.forEach((item, i) => {
            expect(item.name).toEqual(expected[i].name);
            expect(item.sellIn).toEqual(expected[i].sellIn);
            expect(item.quality).toEqual(expected[i].quality);
        });
    });

    it("works with an item with negative sellIn", () => {
        const item = new Item("negsi", -10, 10);
        const items = [item];
        const shop = new Shop(items);
        const actual = shop.updateQuality();
        const expected = [{ name: "negsi", sellIn: -11, quality: 8 }];
        // console.log(actual);
        expect(actual.length).toEqual(expected.length);
        actual.forEach((item, i) => {
            expect(item.name).toEqual(expected[i].name);
            expect(item.sellIn).toEqual(expected[i].sellIn);
            expect(item.quality).toEqual(expected[i].quality);
        });
    });

    it("works with an item with zero sellIn", () => {
        const item = new Item("zersi", 0, 10);
        const items = [item];
        const shop = new Shop(items);
        const actual = shop.updateQuality();
        const expected = [{ name: "zersi", sellIn: -1, quality: 8 }];
        // console.log(actual);
        expect(actual.length).toEqual(expected.length);
        actual.forEach((item, i) => {
            expect(item.name).toEqual(expected[i].name);
            expect(item.sellIn).toEqual(expected[i].sellIn);
            expect(item.quality).toEqual(expected[i].quality);
        });
    });

    it("works with an item with zero quality", () => {
        const item = new Item("zerszerq", 0, 0);
        const items = [item];
        const shop = new Shop(items);
        const actual = shop.updateQuality();
        const expected = [{ name: "zerszerq", sellIn: -1, quality: 0 }];
        // console.log(actual);
        expect(actual.length).toEqual(expected.length);
        actual.forEach((item, i) => {
            expect(item.name).toEqual(expected[i].name);
            expect(item.sellIn).toEqual(expected[i].sellIn);
            expect(item.quality).toEqual(expected[i].quality);
        });
    });

    it("works with an item with negative sellIn and zero quality", () => {
        const item = new Item("negszerq", -10, 0);
        const items = [item];
        const shop = new Shop(items);
        const actual = shop.updateQuality();
        const expected = [{ name: "negszerq", sellIn: -11, quality: 0 }];
        // console.log(actual);
        expect(actual.length).toEqual(expected.length);
        actual.forEach((item, i) => {
            expect(item.name).toEqual(expected[i].name);
            expect(item.sellIn).toEqual(expected[i].sellIn);
            expect(item.quality).toEqual(expected[i].quality);
        });
    });

    it("works with sulfuras being zero quality", () => {
        const item = new Item("Sulfuras, Hand of Ragnaros", -10, 0);
        const items = [item];
        const shop = new Shop(items);
        const actual = shop.updateQuality();
        const expected = [{ name: "Sulfuras, Hand of Ragnaros", sellIn: -10, quality: 0 }];
        // console.log(actual);
        expect(actual.length).toEqual(expected.length);
        actual.forEach((item, i) => {
            expect(item.name).toEqual(expected[i].name);
            expect(item.sellIn).toEqual(expected[i].sellIn);
            expect(item.quality).toEqual(expected[i].quality);
        });
    });

    it("works with sulfuras being negative quality", () => {
        const item = new Item("Sulfuras, Hand of Ragnaros", -10, -10);
        const items = [item];
        const shop = new Shop(items);
        const actual = shop.updateQuality();
        const expected = [{ name: "Sulfuras, Hand of Ragnaros", sellIn: -10, quality: -10 }];
        // console.log(actual);
        expect(actual.length).toEqual(expected.length);
        actual.forEach((item, i) => {
            expect(item.name).toEqual(expected[i].name);
            expect(item.sellIn).toEqual(expected[i].sellIn);
            expect(item.quality).toEqual(expected[i].quality);
        });
    });

    it("works with aged brie being zero quality", () => {
        const item = new Item("Aged Brie", -10, 0);
        const items = [item];
        const shop = new Shop(items);
        const actual = shop.updateQuality();
        const expected = [{ name: "Aged Brie", sellIn: -11, quality: 2 }];
        // console.log(actual);
        expect(actual.length).toEqual(expected.length);
        actual.forEach((item, i) => {
            expect(item.name).toEqual(expected[i].name);
            expect(item.sellIn).toEqual(expected[i].sellIn);
            expect(item.quality).toEqual(expected[i].quality);
        });
    });

    it("works with aged brie being negative quality", () => {
        const item = new Item("Aged Brie", -10, -10);
        const items = [item];
        const shop = new Shop(items);
        const actual = shop.updateQuality();
        const expected = [{ name: "Aged Brie", sellIn: -11, quality: -8 }];
        // console.log(actual);
        expect(actual.length).toEqual(expected.length);
        actual.forEach((item, i) => {
            expect(item.name).toEqual(expected[i].name);
            expect(item.sellIn).toEqual(expected[i].sellIn);
            expect(item.quality).toEqual(expected[i].quality);
        });
    });

    it("works with backstage passes being zero quality", () => {
        const item = new Item("Backstage passes to a TAFKAL80ETC concert", -10, 0);
        const items = [item];
        const shop = new Shop(items);
        const actual = shop.updateQuality();
        const expected = [{ name: "Backstage passes to a TAFKAL80ETC concert", sellIn: -11, quality: 0 }];
        // console.log(actual);
        expect(actual.length).toEqual(expected.length);
        actual.forEach((item, i) => {
            expect(item.name).toEqual(expected[i].name);
            expect(item.sellIn).toEqual(expected[i].sellIn);
            expect(item.quality).toEqual(expected[i].quality);
        });
    });

    it("works with backstage passes being negative quality", () => {
        const item = new Item("Backstage passes to a TAFKAL80ETC concert", -10, -10);
        const items = [item];
        const shop = new Shop(items);
        const actual = shop.updateQuality();
        const expected = [{ name: "Backstage passes to a TAFKAL80ETC concert", sellIn: -11, quality: 0 }];
        // console.log(actual);
        expect(actual.length).toEqual(expected.length);
        actual.forEach((item, i) => {
            expect(item.name).toEqual(expected[i].name);
            expect(item.sellIn).toEqual(expected[i].sellIn);
            expect(item.quality).toEqual(expected[i].quality);
        });
    });


    it("works with backstage passes being zero sellIn", () => {
        const item = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 100);
        const items = [item];
        const shop = new Shop(items);
        const actual = shop.updateQuality();
        const expected = [{ name: "Backstage passes to a TAFKAL80ETC concert", sellIn: -1, quality: 0 }];
        // console.log(actual);
        expect(actual.length).toEqual(expected.length);
        actual.forEach((item, i) => {
            expect(item.name).toEqual(expected[i].name);
            expect(item.sellIn).toEqual(expected[i].sellIn);
            expect(item.quality).toEqual(expected[i].quality);
        });
    });

    it("works with backstage passes being negative sellIn", () => {
        const item = new Item("Backstage passes to a TAFKAL80ETC concert", 0, -100);
        const items = [item];
        const shop = new Shop(items);
        const actual = shop.updateQuality();
        const expected = [{ name: "Backstage passes to a TAFKAL80ETC concert", sellIn: -1, quality: 0 }];
        // console.log(actual);
        expect(actual.length).toEqual(expected.length);
        actual.forEach((item, i) => {
            expect(item.name).toEqual(expected[i].name);
            expect(item.sellIn).toEqual(expected[i].sellIn);
            expect(item.quality).toEqual(expected[i].quality);
        });
    });
});

