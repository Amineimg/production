import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './assets/Dashboard.css'
function DashboardPage() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/books", {
          withCredentials: true,
        });
        setBooks(response.data);
      } catch (err) {
        setError("Erreur lors du chargement des livres");
        console.error(err);
      }
    };

    fetchBooks();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }
    const handleBookClick = (id) => {
    navigate(`/books/${id}`);
  };
  const handleEdit = (id) => {
    navigate(`/books/edit/${id}`);
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce livre ?")) return;
    try {
      await axios.delete(`http://localhost:3001/books/${id}`, {
        withCredentials: true,
      });
      setBooks(books.filter((book) => book._id !== id));
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };
  const handleAdd = () => {
    navigate("/books/add");
  };

  if (error) return <p>{error}</p>;
  const handleLogout = async () => {
  try {
    await axios.post('http://localhost:3001/logout', {}, { withCredentials: true });
    navigate('/login');
  } catch (err) {
    alert('Erreur lors de la déconnexion');
    console.error(err);
  }
};

  return (
     <div className="dashboard-container">
      
      <h2>Dashboard - Liste des livres</h2>
      <button onClick={handleLogout} style={{ marginBottom: "20px" }}>
        Déconnecté
      </button>
      <button onClick={handleAdd} style={{ marginBottom: "15px" }}>
        Ajouter un livre
      </button>
      {books.length === 0 ? (
        <p>Aucun livre trouvé.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Auteur</th>
              <th>Description</th>
              <th>Prix (DH)</th>
              <th>Date de publication</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id} style={{ cursor: "pointer" }}>
                <td onClick={() => handleBookClick(book._id)}>{book.title}</td>
                <td onClick={() => handleBookClick(book._id)}>{book.author}</td>
                <td onClick={() => handleBookClick(book._id)}>{book.description}</td>
                <td onClick={() => handleBookClick(book._id)}>{book.price}</td>
                <td onClick={() => handleBookClick(book._id)}>{new Date(book.publishedDate).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleEdit(book._id)} style={{ marginRight: "5px" }}>
                    Modifier
                  </button>
                  <button onClick={() => handleDelete(book._id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DashboardPage;
