import type React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router";

import "./App.scss";

const App: React.FC = () => {
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