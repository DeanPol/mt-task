interface ProductInterface {
  id: string;
  price: number;
  qty?: number;
  discount?: number;
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

    this.checkProductDiscount(item);
  }

  checkProductDiscount(addedItem: ProductInterface) {
    if (!addedItem.qty || !addedItem.discount) return;

    if (
      this.itemList.filter((item) => item.id == addedItem.id).length ==
      addedItem.qty
    ) {
      this.total -= addedItem.discount;
    }
  }

  getCart(): [ProductInterface[], number] {
    return [this.itemList, this.total];
  }
}

export class Product implements ProductInterface {
  constructor(
    public id: string,
    public price: number,
    public qty?: number,
    public discount?: number
  ) {
    this.id = id;
    this.price = price;
    this.qty = qty;
    this.discount = discount;
  }
}
