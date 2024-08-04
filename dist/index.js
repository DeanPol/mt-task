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
    }
    getCart() {
        return [this.itemList, this.total];
    }
}
exports.Cart = Cart;
class Product {
    constructor(id, price) {
        this.id = id;
        this.price = price;
        this.id = id;
        this.price = price;
    }
}
exports.Product = Product;
