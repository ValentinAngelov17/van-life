import React from "react"
import { useParams, Link, Outlet, NavLink } from "react-router-dom"

export default function HostVans() {
    const { id } = useParams()
    const [currentVan, setCurrentVan] = React.useState(null)

    React.useEffect(() => {
        fetch(`/api/host/vans/${id}`)
            .then(res => res.json())
            .then(data => setCurrentVan(data.vans))
    }, [])

    if (!currentVan) {
        return <h1>Loading...</h1>
    }
    const getVanStyle = (type) => {
        const colors = {
            simple: "#FF8C38",
            luxury: "black",
            rugged: "#074507"
        };
        return {
            backgroundColor: colors[type],
            color: "white",
            padding: "12px 24px",
            borderRadius: "10px"
        };
    };

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <>
            <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>Back to all vans</span>
            </Link>
            <div className="host-van-selected" key={currentVan.id}>

                <div className="host-current-van-details">
                    <img className="host-selected-img" src={currentVan.imageUrl} alt={`Photo of ${currentVan.name}`} />
                    <div className="host-van-selected-info">
                        <i style={getVanStyle(currentVan.type)}>{currentVan.type[0].toUpperCase() + currentVan.type.slice(1)}</i>
                        <h3>{currentVan.name}</h3>
                        <p><span>${currentVan.price}</span>/day</p>
                    </div>

                </div>
                <nav className="host-nav-van">
                    <NavLink to="." end style={({ isActive }) => isActive ? activeStyles : null}>Details</NavLink>
                    <NavLink to="pricing" style={({ isActive }) => isActive ? activeStyles : null}>Pricing</NavLink>
                    <NavLink to="photos" style={({ isActive }) => isActive ? activeStyles : null}>Photos</NavLink>
                </nav>

                <Outlet />
            </div>
        </>
    )
} 