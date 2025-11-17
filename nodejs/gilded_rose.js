class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

class Shop {
    constructor(items = []) {
        this.items = items
            .filter(item =>
                typeof item.name === "string" &&
                typeof item.sellIn === "number" &&
                typeof item.quality === "number"
            )
            .map(({ name, sellIn, quality }) => new Item(name.trim(), sellIn, quality))
            .filter(item => item.name.length > 0);

    }

    #updateAgedBrie(name, sellIn, quality) {
        quality += (quality < 50) ? 1 : 0;
        sellIn = sellIn - 1;
        quality += (sellIn < 0 && quality < 50) ? 1 : 0;

        return new Item(name, sellIn, quality);
    }

    #updateBackstagePass(name, sellIn, quality) {

        if (quality < 50) {
            quality = quality + 1;
            if (sellIn < 11 && quality < 50) {
                quality = quality + 1;
            }
            if (sellIn < 6 && quality < 50) {
                quality = quality + 1;
            }
        }

        sellIn = sellIn - 1;

        if (sellIn < 0) {
            quality = 0;
        }

        return new Item(name, sellIn, quality);

    }
    updateQuality() {
        return this.items.map(({ name, sellIn, quality }) => {
            if (name === 'Sulfuras, Hand of Ragnaros') {
                return new Item(name, sellIn, quality);
            }
            if (quality < 0) {
                return new Item(name, sellIn - 1, quality);
            }

            if (name === "Aged Brie") {
                return this.#updateAgedBrie(name, sellIn, quality);
            }

            if (name === 'Backstage passes to a TAFKAL80ETC concert') {
                return this.#updateBackstagePass(name, sellIn, quality);
            }

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
