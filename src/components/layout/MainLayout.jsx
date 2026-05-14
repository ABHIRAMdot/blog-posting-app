import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

import "./MainLayout.css"


export const MainLayout = () => {
    return (
        <div className="app-layout">
            <Navbar />

            <main className="main-content">
                <Outlet />
            </main>

        </div>
    )
}