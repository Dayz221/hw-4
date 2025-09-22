import { action, makeObservable, observable } from "mobx";
import qs from "qs"

type privateFields = "_params";

export class QueryStore {
    private _params: qs.ParsedQs = {};
    private _search: string = "";

    constructor() {
        makeObservable<this, privateFields>(
            this,
            {
                _params: observable.ref,
                setParams: action,
            }
        )
    }

    getParam(key: string): undefined | string | qs.ParsedQs | (string | qs.ParsedQs)[] {
        return this._params[key];
    }

    setParams(query: string) {
        const params = query.startsWith("?") ? query.slice(1) : query;

        if (params !== this._search) {
            this._search = params;
            this._params = qs.parse(params);
        }
    }
}