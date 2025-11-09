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
        return this.items.map(({name, sellIn, quality}) => {
            if (name != 'Aged Brie' &&
                name != 'Backstage passes to a TAFKAL80ETC concert') {
                if (quality > 0) {
                    if (name != 'Sulfuras, Hand of Ragnaros') {
                        quality = quality - 1;
                    }
                }
            } else {
                if (quality < 50) {
                    quality = quality + 1;
                    if (name == 'Backstage passes to a TAFKAL80ETC concert') {
                        if (sellIn < 11) {
                            if (quality < 50) {
                                quality = quality + 1;
                            }
                        }
                        if (sellIn < 6) {
                            if (quality < 50) {
                                quality = quality + 1;
                            }
                        }
                    }
                }
            }
            if (name != 'Sulfuras, Hand of Ragnaros') {
                sellIn = sellIn - 1;
            }
            if (sellIn < 0) {
                if (name != 'Aged Brie') {
                    if (name != 'Backstage passes to a TAFKAL80ETC concert') {
                        if (quality > 0) {
                            if (name != 'Sulfuras, Hand of Ragnaros') {
                                quality = quality - 1;
                            }
                        }
                    } else {
                        quality = quality - quality;
                    }
                } else {
                    if (quality < 50) {
                        quality = quality + 1;
                    }
                }
            }
            return new Item(name, sellIn, quality);
        });
    }
}

module.exports = {
    Item,
    Shop
}
