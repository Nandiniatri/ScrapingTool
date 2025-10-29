import { useEffect, useState } from "react";
import axios from "axios";


export default function BooksData() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:4000/api/books")
      .then(res => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 className="loading">Loading books...</h2>;

  return (
    <div className="app">
      <h1 className="title">📚 Books To Scrape</h1>
      <div className="book-grid">
        {books.map(book => (
          <div key={book.id} className="book-card">
            <img src={book.image} alt={book.title} className="book-image" />
            <h3 className="book-title">{book.title}</h3>
            <p className="book-price">{book.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
