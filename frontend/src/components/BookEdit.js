import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './assets/BookEdit.css'
function BookEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    publishedDate: "",
    price: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/books/${id}`, {
          withCredentials: true,
        });
        const book = res.data;
        setForm({
          title: book.title,
          author: book.author,
          description: book.description,
          publishedDate: book.publishedDate ? book.publishedDate.slice(0, 10) : "",
          price: book.price,
        });
      } catch (err) {
        setError("Erreur lors de la récupération du livre");
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedBook = {
        ...form,
        publishedDate: new Date(form.publishedDate),
        price: parseFloat(form.price),
      };
      await axios.put(`http://localhost:3001/books/${id}`, updatedBook, {
        withCredentials: true,
      });
      navigate("/dashboard"); // ترجع للداشبورد بعد التعديل
    } catch (err) {
      setError("Erreur lors de la mise à jour du livre");
    }
  };

  return (
    <div className="edit-form-container">
      <button onClick={() => navigate('/dashboard')}>Retour</button>
      <h2>Modifier le livre</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre:</label>
          <input name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Auteur:</label>
          <input name="author" value={form.author} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Date de publication:</label>
          <input
            type="date"
            name="publishedDate"
            value={form.publishedDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Prix (DH):</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
}

export default BookEdit;
