import { Navigate, type RouteObject } from "react-router";
import App from "../app";
import ProductsPage from "../pages/ProductsPage";
import ProductPage from "../pages/ProductPage";

export const routesConfig: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/products",
                element: <ProductsPage />
            },
            {
                path: "/products/:id",
                element: <ProductPage />
            },
            {
                path: "/categories",
                element: <ProductPage />
            },
            {
                path: "/about_us",
                element: <ProductPage />
            },
            {
                path: "*",
                element: <Navigate to="/products" />
            }
        ]
    }
];
