"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.Cart = void 0;
class Cart {
    constructor() {
        this.itemList = [];
        this.total = 0;
        this.itemMap = new Map();
    }
    addToMap(key) {
        const currentCount = this.itemMap.get(key) || 0;
        this.itemMap.set(key, currentCount + 1);
    }
    removeFromMap(key) {
        const currentCount = this.itemMap.get(key) || 0;
        this.itemMap.set(key, currentCount - 1);
    }
    addItem(item) {
        this.itemList.push(item);
        this.addToMap(item.id);
        this.total += item.price;
        this.checkProductDiscount(item);
    }
    removeItem(item) {
        let itemIndexToDelete = this.itemList.indexOf(item);
        if (itemIndexToDelete == -1)
            return;
        this.itemList.splice(itemIndexToDelete, 1);
        this.removeFromMap(item.id);
        this.total -= item.price;
        this.checkProductDiscountOnRemove(item);
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
    checkProductDiscountOnRemove(removedItem) {
        if (!removedItem.qty || !removedItem.discount)
            return;
        if (this.getSameCount(removedItem.id) == removedItem.qty - 1) {
            this.total += removedItem.discount;
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
