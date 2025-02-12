import { Link } from "react-router-dom"
import "../server"
import React from "react"

export default function Vans() {

    const [vans, setVans] = React.useState([])
    React.useEffect(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => setVans(data.vans))
    }, [])

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
    const vanElements = vans.map(van => (
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
            <div className="container">
                {vanElements}
            </div>
        </>
    )
}