import { Item } from './Item';

export class CartItems {
    amount: number;
    item: Item;

    constructor(item: Item, amount: number) {
        this.item = item;
        this.amount = amount;
    }
}