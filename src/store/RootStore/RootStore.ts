import { CartStore } from "./CartStore";
import { QueryStore } from "./QueryStore";
import { UserStore } from "./UserStore/UserStore";

export class RootStore {
    readonly query = new QueryStore();
    readonly cart = new CartStore();
    readonly user = new UserStore();
}