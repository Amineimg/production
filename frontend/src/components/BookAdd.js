import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './assets/BookAdd.css'
function BookAdd() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    publishedDate: "",
    price: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBook = {
        ...form,
        publishedDate: new Date(form.publishedDate),
        price: parseFloat(form.price),
      };
      await axios.post("http://localhost:3001/books", newBook, {
        withCredentials: true,
      });
      navigate("/dashboard"); 
    } catch (err) {
      setError("Erreur lors de l'ajout du livre");
    }
  };

  return (
    <div className="add-book-container ">
      <button onClick={() => navigate('/dashboard')}>Retour</button>
      <h2>Ajouter un nouveau livre</h2>
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
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default BookAdd;
