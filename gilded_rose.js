class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

class Shop {
    constructor(items = []) {
        this.items = items;
    }
    updateQuality() {
        return this.items.map(({ name, sellIn, quality }) => {
            if (name === 'Sulfuras, Hand of Ragnaros') {
                return new Item(name, sellIn, quality);
            }
            const maxQ = Math.max(50, quality);

            if (name === "Aged Brie") {
                quality = Math.min(maxQ, quality + 1);

                sellIn = sellIn - 1;
                if (sellIn < 0) {
                    quality = Math.min(maxQ, quality + 1);
                }
                return new Item(name, sellIn, quality);
            }

            if (name === 'Backstage passes to a TAFKAL80ETC concert') {
                quality = Math.min(maxQ, quality + 1);
                if (sellIn < 11) {
                    quality = Math.min(maxQ, quality + 1);
                }
                if (sellIn < 6) {
                    quality = Math.min(maxQ, quality + 1);
                }
                sellIn = sellIn - 1;
                if (sellIn < 0) {
                    quality = 0;
                }
                return new Item(name, sellIn, quality);
            }

            // rest of the items get their quality decreased
            quality = Math.max(0, quality - 1);
            sellIn = sellIn - 1;
            if (sellIn < 0) {
                quality = Math.max(0, quality - 1);
            }
            return new Item(name, sellIn, quality);
        });
    }
}

module.exports = {
    Item,
    Shop
}
