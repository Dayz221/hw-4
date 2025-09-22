import type React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router";

import "./App.scss";
import { useQueryStore } from "../store/RootStore/hooks/useQueryStore";
import { useEffect } from "react";
import { fetchCategories } from "../api/Strapi/Products";
import { useCartStore } from "../store/RootStore/hooks/useCartStore";

const App: React.FC = () => {
    useQueryStore();
    useCartStore();

    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <div className="page_container">
            <Header />
            <div className="page_content">
                <Outlet />
            </div>
        </div>
    )
}

export default App;