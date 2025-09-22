export const ROUTES = {
    products: {
        path: "/products",
        get: () => "/products",
    },
    
    product: {
        path: "/product/:id",
        get: (id: string) => `/product/${id}`,
    },
    
    categories: {
        path: "/categories",
        get: () => "/categories"
    },
    
    aboutUs: {
        path: "/about_us",
        get: () => "/about_us"
    },
    
    cart: {
        path: "/basket",
        get: () => "/basket"
    }
}