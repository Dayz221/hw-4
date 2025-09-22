import { action, computed, makeObservable, observable } from "mobx";
import type { ProductCardModel } from "../../models/products/ProductCard";

type privateFields = "_items";

export class CartStore {
    private _items: ProductCardModel[] = [];

    constructor() {
        makeObservable<this, privateFields>(
            this,
            {
                _items: observable,
                items: computed,
                addItem: action,
                loadItems: action
            }
        )
    }

    loadItems() {
        this._items = JSON.parse(localStorage.getItem("cart") || "[]") as ProductCardModel[];
    }
    
    addItem(item: ProductCardModel) {
        const items = (JSON.parse(localStorage.getItem("cart") || "[]")) as ProductCardModel[];
        if (!this._items.find(el => el.id === item.id)) {
            this._items.push(item);
            localStorage.setItem("cart", JSON.stringify([...items, item]));
        }
    }

    checkInCart(item: ProductCardModel): boolean {
        return !!this._items.find(el => el.id === item.id);
    }

    get items() {
        return this._items;
    }
};