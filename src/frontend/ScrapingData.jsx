import React, { useEffect, useState } from "react";

export default function ScrapingData() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/scrape")
      .then((res) => res.json())
      .then((data) => setQuotes(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>🕵️‍♂️ Web Scraping Demo (React + Node)</h2>
      {quotes.length === 0 ? (
        <p>Loading scraped data...</p>
      ) : (
        quotes.map((q, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ddd",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <p><strong>“{q.text}”</strong></p>
            <p>— {q.author}</p>
          </div>
        ))
      )}
    </div>
  );
}
