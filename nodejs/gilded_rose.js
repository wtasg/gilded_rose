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
            if (name === 'Aged Brie') {
                quality += quality < 50 ? 1 : 0;
                sellIn = sellIn - 1;
                quality += sellIn < 0 && quality < 50 ? 1 : 0;
                return new Item(name, sellIn, quality);
            }
            if (name === 'Backstage passes to a TAFKAL80ETC concert') {
                quality += quality < 50 ? 1 : 0;
                quality += sellIn < 11 && quality < 50 ? 1 : 0;
                quality += sellIn < 6 && quality < 50 ? 1 : 0;
                sellIn = sellIn - 1;
                quality = sellIn < 0 ? 0 : quality;
                return new Item(name, sellIn, quality);
            }
            quality -= quality > 0 ? 1 : 0;
            sellIn = sellIn - 1;
            quality -= sellIn < 0 && quality > 0 ? 1 : 0;
            return new Item(name, sellIn, quality);
        });
    }
}

module.exports = {
    Item,
    Shop
}
