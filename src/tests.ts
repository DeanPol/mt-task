import { Cart, Product } from "./index";

function assertEquals(parameter1: number, parameter2: number, message: string) {
  if (parameter1 != parameter2) {
    throw new Error(message);
  }
  console.log("passed");
}

export function test1_addItems() {
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

export function test2_removeItems() {
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

export function test3_checkDiscount() {
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

export function test4_campaignDiscount() {
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
