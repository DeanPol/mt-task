"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test1_addItems = test1_addItems;
exports.test2_removeItems = test2_removeItems;
exports.test3_checkDiscount = test3_checkDiscount;
exports.test4_campaignDiscount = test4_campaignDiscount;
const index_1 = require("./index");
function assertEquals(parameter1, parameter2, message) {
    if (parameter1 != parameter2) {
        throw new Error(message);
    }
    console.log("passed");
}
function test1_addItems() {
    const cart = new index_1.Cart();
    const item1 = new index_1.Product("Apples", 300);
    const item2 = new index_1.Product("Bananas", 500);
    cart.addItem(item1);
    cart.addItem(item2);
    cart.addItem(item1);
    const checkout = cart.getCart();
    assertEquals(3, checkout[0].length, "Wrong cart size");
    assertEquals(1100, checkout[1], "Invalid total");
}
function test2_removeItems() {
    const cart = new index_1.Cart();
    const item1 = new index_1.Product("Apples", 300);
    const item2 = new index_1.Product("Bananas", 500);
    cart.addItem(item1);
    cart.addItem(item2);
    cart.addItem(item1);
    cart.removeItem(item2);
    const checkout = cart.getCart();
    assertEquals(2, checkout[0].length, "Wrong cart size");
    assertEquals(600, checkout[1], "Invalid total");
}
function test3_checkDiscount() {
    const cart = new index_1.Cart();
    const item1 = new index_1.Product("Apples", 300, 2, 100);
    const item2 = new index_1.Product("Bananas", 500, 3, 500);
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
    const cart = new index_1.Cart();
    cart.setCampaignTerms(1000, 200);
    const item1 = new index_1.Product("Apples", 300, 2, 100);
    const item2 = new index_1.Product("Bananas", 500, 3, 500);
    cart.addItem(item1);
    cart.addItem(item1);
    cart.addItem(item1);
    cart.addItem(item2);
    cart.checkCampaignDiscount();
    const checkout = cart.getCart();
    assertEquals(1100, checkout[1], "Invalid Total");
}
