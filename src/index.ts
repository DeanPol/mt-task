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

  private campaignPriceGoal?: number;
  private campaignOffer?: number;

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

  removeItem(item: ProductInterface): void {
    let itemIndexToDelete = this.itemList.indexOf(item);
    if (itemIndexToDelete == -1) return;

    this.itemList.splice(itemIndexToDelete, 1);
    this.removeFromMap(item.id);
    this.total -= item.price;

    this.checkProductDiscountOnRemove(item);
  }

  private addToMap(key: string): void {
    const currentCount = this.itemMap.get(key) || 0;
    this.itemMap.set(key, currentCount + 1);
  }

  private removeFromMap(key: string): void {
    const currentCount = this.itemMap.get(key) || 0;
    this.itemMap.set(key, currentCount - 1);
  }

  private getSameCount(key: string): number {
    return this.itemMap.get(key) || 0;
  }

  private checkProductDiscount(addedItem: ProductInterface): void {
    if (!addedItem.qty || !addedItem.discount) return;

    if (this.getSameCount(addedItem.id) == addedItem.qty) {
      this.total -= addedItem.discount;
    }
  }

  private checkProductDiscountOnRemove(removedItem: ProductInterface): void {
    if (!removedItem.qty || !removedItem.discount) return;

    if (this.getSameCount(removedItem.id) == removedItem.qty - 1) {
      this.total += removedItem.discount;
    }
  }

  setCampaignTerms(priceGoal: number, offer: number) {
    this.campaignPriceGoal = priceGoal;
    this.campaignOffer = offer;
  }

  checkCampaignDiscount() {
    if (!this.campaignPriceGoal) return;

    if (this.total >= this.campaignPriceGoal) {
      this.total -= this.campaignOffer || 0;
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
  ) {}
}
