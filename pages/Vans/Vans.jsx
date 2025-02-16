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
            simple: "#E17654",
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

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    return (
        <>
            <div className="van-filters">
                <button className={typeFilter === "simple" ? "van-type simple selected" : "van-type simple"} onClick={() => handleFilterChange("type", "simple")}>Simple</button>
                <button className={typeFilter === "luxury" ? "van-type luxury selected" : "van-type luxury"} onClick={() => handleFilterChange("type", "luxury")}>Luxury</button>
                <button className={typeFilter === "rugged" ? "van-type rugged selected" : "van-type rugged"} onClick={() => handleFilterChange("type", "rugged")}>Rugged</button>
                {typeFilter ? <button onClick={() => handleFilterChange("type", null)}>Clear filters</button> : null}
            </div>
            <div className="container">
                {vanElements}
            </div>
        </>
    )
}