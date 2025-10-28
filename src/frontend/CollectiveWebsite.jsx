import { useEffect, useState } from "react";

export default function CollectiveWebsite() {
    const [tops, setTops] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:4000/api/tops")
            .then((res) => res.json())
            .then((data) => {
                setTops(data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ padding: "2rem", fontFamily: "Arial" }}>
            <h1>Women Tops (Scraped)</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {tops.map((title, i) => (
                        <li key={i}>{title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
