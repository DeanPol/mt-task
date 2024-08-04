interface ProductInterface {
  id: string;
  price: number;
}

export class Cart {
  private itemList: ProductInterface[];
  private total: number;

  constructor() {
    this.itemList = [];
    this.total = 0;
  }

  addItem(item: ProductInterface) {
    this.itemList.push(item);
    this.total += item.price;
  }

  getCart(): [ProductInterface[], number] {
    return [this.itemList, this.total];
  }
}

export class Product implements ProductInterface {
  constructor(public id: string, public price: number) {
    this.id = id;
    this.price = price;
  }
}
