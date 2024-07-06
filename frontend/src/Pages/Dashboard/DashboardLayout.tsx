import { Outlet } from "react-router-dom";
import { DashboardNavbar } from "../../Components/DashboardNavbar";

export function DashboardLayout() {
    return (
        <>
            <DashboardNavbar />
            <Outlet />
        </>
    )
}