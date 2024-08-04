"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.Cart = void 0;
class Cart {
    constructor() {
        this.itemList = [];
        this.total = 0;
    }
    addItem(item) {
        this.itemList.push(item);
        this.total += item.price;
        this.checkProductDiscount(item);
    }
    checkProductDiscount(addedItem) {
        if (!addedItem.qty || !addedItem.discount)
            return;
        if (this.itemList.filter((item) => item.id == addedItem.id).length ==
            addedItem.qty) {
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
