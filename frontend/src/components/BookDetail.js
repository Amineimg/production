// BookDetail.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './assets/BookDetail.css'
function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/books/${id}`, { withCredentials: true })
      .then((res) => setBook(res.data))
      .catch((err) => {
        console.error(err);
        alert("Erreur lors de la récupération du livre");
      });
  }, [id]);

  if (!book) return <p>Chargement...</p>;

  return (
    <div className="book-details-container">
      <button onClick={() => navigate('/dashboard')}>Retour</button>
      <h2>{book.title}</h2>
      <p><strong>Auteur:</strong> {book.author}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Date de publication:</strong> {new Date(book.publishedDate).toLocaleDateString()}</p>
      <p><strong>Prix:</strong> {book.price} €</p>
    </div>
  );
}

export default BookDetail;
