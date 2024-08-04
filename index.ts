interface ProductInterface {
  id: string;
  price: number;
  qty?: number;
  discount?: number;
}

export class Cart {
  private itemList: ProductInterface[];
  private total: number;
  private itemMap: Map<string, number>;

  constructor() {
    this.itemList = [];
    this.total = 0;
    this.itemMap = new Map();
  }

  addItem(item: ProductInterface): void {
    this.itemList.push(item);
    this.addToMap(item.id);
    this.total += item.price;

    this.checkProductDiscount(item);
  }

  addToMap(key: string): void {
    const currentCount = this.itemMap.get(key) || 0;
    this.itemMap.set(key, currentCount + 1);
  }

  getSameCount(key: string): number {
    return this.itemMap.get(key) || 0;
  }

  checkProductDiscount(addedItem: ProductInterface): void {
    if (!addedItem.qty || !addedItem.discount) return;

    if (this.getSameCount(addedItem.id) == addedItem.qty) {
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
