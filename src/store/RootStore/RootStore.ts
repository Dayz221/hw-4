import { CartStore } from "./CartStore";
import { QueryStore } from "./QueryStore";

export class RootStore {
    readonly query = new QueryStore();
    readonly cart = new CartStore();
}