import STRAPI from "."
import qs from "qs"

export type ProductCardImage = {
    url: string,
    formats: {
        large: {
            url: string
        },
        medium: {
            url: string
        },
        small: {
            url: string
        },
        thumbnail: {
            url: string
        },
    }
};

export type ProductCard = {
    id: number,
    documentId: string,

    title: string,
    description: string,

    price: number,
    discountPercent: number,

    rating: number,
    isInStock: boolean,

    images: ProductCardImage[],
    productCategory: {
        id: number,
        documentId: string,
        title: string,
    }
};

export type PaginationInfo = {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
};

export type FetchProductsResponse = {
    data: ProductCard[];
    pagination: PaginationInfo;
};

export const fetchProducts: (page?: number, pageSize?: number) => Promise<FetchProductsResponse> = async (page = 0, pageSize = 20) => {
    const query = qs.stringify({
        populate: ['images', 'productCategory'],
        pagination: {
            page,
            pageSize,
        }
    });

    const response = await STRAPI.get(`/products?${query}`);

    return { data: response.data.data, pagination: response.data.meta.pagination };
};

export const fetchProduct: (documentId: string) => Promise<ProductCard> = async (id) => {
    const query = qs.stringify({
        populate: ['images', 'productCategory'],
    });

    const response = await STRAPI.get(`/products/${id}?${query}`)

    return response.data.data;
};