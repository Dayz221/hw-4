import { Navigate, type RouteObject } from "react-router";
import App from "../app";
import ProductsPage from "../pages/ProductsPage";
import ProductPage from "../pages/ProductPage";
import CategoriesPage from "../pages/CategoriesPage";
import AboutPage from "../pages/AboutPage";
import Page404 from "../pages/Page404";

import { ROUTES } from "./routes"

export const routesConfig: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Navigate replace to={ROUTES.products.get()} />
            },
            {
                path: ROUTES.products.path,
                element: <ProductsPage />
            },
            {
                path: ROUTES.product.path,
                element: <ProductPage />
            },
            {
                path: ROUTES.categories.path,
                element: <CategoriesPage />
            },
            {
                path: ROUTES.aboutUs.path,
                element: <AboutPage />
            },
            {
                path: "*",
                element: <Page404 />
            }
        ]
    }
];
