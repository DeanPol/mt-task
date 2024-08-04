"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.Cart = void 0;
exports.test1_addItems = test1_addItems;
exports.test2_removeItems = test2_removeItems;
exports.test3_checkDiscount = test3_checkDiscount;
exports.test4_campaignDiscount = test4_campaignDiscount;
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
    setCampaignTerms(priceGoal, offer) {
        this.campaignPriceGoal = priceGoal;
        this.campaignOffer = offer;
    }
    checkCampaignDiscount() {
        if (!this.campaignPriceGoal)
            return;
        if (this.total >= this.campaignPriceGoal) {
            this.total -= this.campaignOffer || 0;
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
function assertEquals(parameter1, parameter2, message) {
    if (parameter1 != parameter2) {
        throw new Error(message);
    }
    console.log("passed");
}
function test1_addItems() {
    const cart = new Cart();
    const item1 = new Product("Apples", 300);
    const item2 = new Product("Bananas", 500);
    cart.addItem(item1);
    cart.addItem(item2);
    cart.addItem(item1);
    const checkout = cart.getCart();
    assertEquals(3, checkout[0].length, "Wrong cart size");
    assertEquals(1100, checkout[1], "Invalid total");
}
function test2_removeItems() {
    const cart = new Cart();
    const item1 = new Product("Apples", 300);
    const item2 = new Product("Bananas", 500);
    cart.addItem(item1);
    cart.addItem(item2);
    cart.addItem(item1);
    cart.removeItem(item2);
    const checkout = cart.getCart();
    assertEquals(2, checkout[0].length, "Wrong cart size");
    assertEquals(600, checkout[1], "Invalid total");
}
function test3_checkDiscount() {
    const cart = new Cart();
    const item1 = new Product("Apples", 300, 2, 100);
    const item2 = new Product("Bananas", 500, 3, 500);
    cart.addItem(item1);
    cart.addItem(item1);
    cart.addItem(item2);
    cart.addItem(item2);
    cart.addItem(item2);
    cart.removeItem(item1);
    const checkout = cart.getCart();
    assertEquals(1300, checkout[1], "Invalid total");
}
function test4_campaignDiscount() {
    const cart = new Cart();
    cart.setCampaignTerms(1000, 200);
    const item1 = new Product("Apples", 300, 2, 100);
    const item2 = new Product("Bananas", 500, 3, 500);
    cart.addItem(item1);
    cart.addItem(item1);
    cart.addItem(item1);
    cart.addItem(item2);
    cart.checkCampaignDiscount();
    const checkout = cart.getCart();
    assertEquals(1100, checkout[1], "Invalid Total");
}
