import { Link, useSearchParams } from "react-router-dom"
import "../../server"
import React from "react"

export default function Vans() {

    const [vans, setVans] = React.useState([])
    React.useEffect(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => setVans(data.vans))
    }, [])

    const [searchParams, setSearchParams] = useSearchParams()

    const typeFilter = searchParams.get("type")
    const possibleTypes = ["simple", "luxury", "rugged"]
    const selectedVans = possibleTypes.includes(typeFilter) ? vans.filter(van => van.type === typeFilter) : vans

    const getVanStyle = (type) => {
        const colors = {
            simple: "#FF8C38",
            luxury: "black",
            rugged: "#074507"
        };
        return {
            backgroundColor: colors[type],
            color: "white",
            padding: "14px 28px",
            borderRadius: "10px"
        };
    };
    const vanElements = selectedVans.map(van => (
        <div key={van.id} className="van-tile">
            <Link to={`/vans/${van.id}`}>
                <img src={van.imageUrl} />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i style={getVanStyle(van.type)}>{van.type[0].toUpperCase() + van.type.slice(1)}</i>
            </Link>
        </div>
    ))

    return (
        <>
            <div className="van-filters">
                <Link to="?type=simple">Simple</Link>
                <Link to="?type=luxury">Luxury</Link>
                <Link to="?type=rugged">Rugged</Link>
                <Link to="." style={{backgroundColor: "unset", textDecoration: "underline"}}>Clear filters</Link>
            </div>
            <div className="container">
                {vanElements}
            </div>
        </>
    )
}