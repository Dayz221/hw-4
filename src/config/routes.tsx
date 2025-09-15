import { Navigate, type RouteObject } from "react-router";
import App from "../app";
import ProductsPage from "../pages/ProductsPage";
import ProductPage from "../pages/ProductPage";
import CategoriesPage from "../pages/CategoriesPage";
import AboutPage from "../pages/AboutPage";
import Page404 from "../pages/Page404";

export const routesConfig: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Navigate replace to="/products" />
            },
            {
                path: "/products",
                element: <ProductsPage />
            },
            {
                path: "/products/:page",
                element: <ProductsPage />
            },
            {
                path: "/product/:id",
                element: <ProductPage />
            },
            {
                path: "/categories",
                element: <CategoriesPage />
            },
            {
                path: "/about_us",
                element: <AboutPage />
            },
            {
                path: "*",
                element: <Page404 />
            }
        ]
    }
];
