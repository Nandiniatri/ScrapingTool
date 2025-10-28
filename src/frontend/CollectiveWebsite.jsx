import { useEffect, useState } from "react";
import axios from "axios";

function CollectiveWebsite() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:4000/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading products...</h2>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", padding: "20px" }}>
      {products.map((p, i) => (
        <div key={i} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "10px" }}>
          <img src={p.image} alt={p.title} width="200" />
          <h3>{p.title}</h3>
          <p>{p.price}</p>
          <a href={p.link} target="_blank">View Product</a>
        </div>
      ))}
    </div>
  );
}

export default CollectiveWebsite;
