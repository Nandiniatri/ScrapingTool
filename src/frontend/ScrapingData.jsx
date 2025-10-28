import React, { useEffect, useState } from "react";

export default function ScrapingData() {
    const [query, setQuery] = useState("bags");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        setLoading(true);
        setError("");
        setProducts([]);

        try {
            const res = await fetch(
                `http://localhost:4000/scrape-flipkart?q=${encodeURIComponent(query)}`
            );

            if (!res.ok) throw new Error("Backend not responding properly");

            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Default load on first render
    useEffect(() => {
        handleSearch();
    }, []);

    return (
        <div
            style={{
                fontFamily: "Segoe UI, sans-serif",
                background: "#f7f7f7",
                minHeight: "100vh",
                padding: "30px",
            }}
        >
            <h1 style={{ textAlign: "center", color: "#2874f0" }}>
                🛍️ Flipkart Scraper (React + Node)
            </h1>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "20px 0",
                    gap: "10px",
                }}
            >
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search anything (e.g. bags, shoes)"
                    style={{
                        width: "300px",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        fontSize: "16px",
                    }}
                />
                <button
                    onClick={handleSearch}
                    style={{
                        background: "#2874f0",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "10px 20px",
                        cursor: "pointer",
                        fontSize: "16px",
                    }}
                >
                    Search
                </button>
            </div>

            {loading && <p style={{ textAlign: "center" }}>⏳ Loading...</p>}
            {error && (
                <p style={{ color: "red", textAlign: "center" }}>⚠️ {error}</p>
            )}

            {!loading && !error && products.length === 0 && (
                <p style={{ textAlign: "center" }}>No products found 😢</p>
            )}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px",
                    marginTop: "30px",
                }}
            >
                {products.map((p, i) => (
                    <div
                        key={i}
                        style={{
                            background: "white",
                            padding: "15px",
                            borderRadius: "10px",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                        }}
                    >
                        <h3
                            style={{
                                fontSize: "16px",
                                color: "#333",
                                minHeight: "50px",
                            }}
                        >
                            {p.name}
                        </h3>
                        <p style={{ fontWeight: "bold", color: "#2874f0" }}>{p.price}</p>
                        <p style={{ color: "#666" }}>
                            ⭐ {p.rating ? p.rating : "No rating"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
