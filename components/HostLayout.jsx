import { NavLink, Outlet } from "react-router-dom"

export default function HostLayout() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <>
            <nav className="host-nav">
                <NavLink end style={({ isActive }) => isActive ? activeStyles : null} to="/host" >Dashboard</NavLink>
                <NavLink style={({ isActive }) => isActive ? activeStyles : null} to="/host/income">Income</NavLink>
                <NavLink style={({ isActive }) => isActive ? activeStyles : null} to="/host/reviews">Reviews</NavLink>
                <NavLink style={({ isActive }) => isActive ? activeStyles : null} to="/host/vans">Vans</NavLink>
            </nav>
            <Outlet />
        </>
    )
}