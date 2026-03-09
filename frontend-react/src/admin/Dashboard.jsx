import "./Dashboard.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/contacts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContacts((prev) => prev.filter((contact) => contact._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDelete = async () => {
    try {
      await fetch(`http://localhost:5000/contacts/${selectedId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContacts((prev) =>
        prev.filter((contact) => contact._id !== selectedId),
      );

      setShowModal(false);
      setSelectedId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container" style={{ padding: "40px" }}>
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>

        <div style={{ marginTop: "20px" }}>
          <Link
            to="/admin/contacts"
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "5px",
              marginRight: "10px",
            }}
          >
            Manage Contacts
          </Link>

          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
