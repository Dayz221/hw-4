import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { Meta } from "../../utils/meta";
import type { ProductCardModel } from "../models/products/ProductCard";
import { fetchCategories, fetchProducts } from "../../api/Strapi/Products";
import { CARDS_COUNT } from "../../consts";
import { normalizeFetchProductsResponse } from "../models/products/FetchProductsResponse";
import { initialPaginationInfo, type PaginationInfoModel } from "../models/products/PaginationInfo";
import rootStore from "../RootStore";
import type { ILocalStore } from "../useLocalStore/useLocalStore";
import type { Option } from "../../components/MultiDropdown";
import { normalizeCategory } from "../models/categories/category";

type privateFields = "_meta" | "_products" | "_pagination" | "_categories";

export default class ProductsStore implements ILocalStore {
    private _products: ProductCardModel[] = [];
    private _pagination: PaginationInfoModel = initialPaginationInfo();
    private _categories: Option[] = [];
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<this, privateFields>(
            this,
            {
                _products: observable.ref,
                _pagination: observable,
                _categories: observable.ref,
                _meta: observable,
                meta: computed,
                products: computed,
                pagination: computed,
                categories: computed,
                fetchProducts: action,
                fetchCategories: action
            }
        )
    }

    async fetchProducts() {
        this._meta = Meta.loading;

        const response = await fetchProducts(
            Number(rootStore.query.getParam("page") || 1),
            String(rootStore.query.getParam("search") || ""),
            rootStore.query.getParam("categories") as Option[] || [],
            CARDS_COUNT
        );

        runInAction(() => {
            try {
                const normalized = normalizeFetchProductsResponse(response);
                this._products = normalized.data;
                this._pagination = normalized.pagination;

                this._meta = Meta.success;


            } catch (err) {
                this._meta = Meta.error;
            }
        })
    }

    async fetchCategories() {
        this._meta = Meta.loading;

        const response = await fetchCategories();

        runInAction(() => {
            try {
                this._categories = []
                for (const fromCategory of response) {
                    this._categories.push(normalizeCategory(fromCategory))
                }

                this._meta = Meta.success;


            } catch (err) {
                this._meta = Meta.error;
            }
        })
    }

    get meta() {
        return this._meta;
    }

    get products() {
        return this._products;
    }

    get pagination() {
        return this._pagination;
    }

    get categories() {
        return this._categories;
    }

    destroy() {

    }
}