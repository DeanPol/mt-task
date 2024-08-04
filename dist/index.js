"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.Cart = void 0;
class Cart {
    constructor() {
        this.itemList = [];
        this.total = 0;
        this.itemMap = new Map();
    }
    addItem(item) {
        this.itemList.push(item);
        this.addToMap(item.id);
        this.total += item.price;
        this.checkProductDiscount(item);
    }
    addToMap(key) {
        const currentCount = this.itemMap.get(key) || 0;
        this.itemMap.set(key, currentCount + 1);
    }
    getSameCount(key) {
        return this.itemMap.get(key) || 0;
    }
    checkProductDiscount(addedItem) {
        if (!addedItem.qty || !addedItem.discount)
            return;
        if (this.getSameCount(addedItem.id) == addedItem.qty) {
            this.total -= addedItem.discount;
        }
    }
    getCart() {
        return [this.itemList, this.total];
    }
}
exports.Cart = Cart;
class Product {
    constructor(id, price, qty, discount) {
        this.id = id;
        this.price = price;
        this.qty = qty;
        this.discount = discount;
        this.id = id;
        this.price = price;
        this.qty = qty;
        this.discount = discount;
    }
}
exports.Product = Product;
