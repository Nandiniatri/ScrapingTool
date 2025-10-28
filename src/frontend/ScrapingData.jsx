import React, { useState } from "react";

export default function App() {
  const [q, setQ] = useState("mobile");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchScrape = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:4000/scrape-flipkart?q=${encodeURIComponent(q)}`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
      setData({ error: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Flipkart Scrape Demo</h3>
      <input value={q} onChange={e=>setQ(e.target.value)} />
      <button onClick={fetchScrape}>Scrape</button>
      {loading && <p>Loading…</p>}
      {data && (
        <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
