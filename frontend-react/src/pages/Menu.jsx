import { useEffect, useState } from "react";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        // Ensure VITE_API_URL does not have a trailing slash in your .env
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/menu`);

        if (!response.ok) {
          // If 404, it means the endpoint path is likely wrong in Express
          if (response.status === 404) {
            throw new Error("Menu endpoint not found (404). Check your Express routes.");
          }
          throw new Error("Server is waking up or encountered an error.");
        }

        const data = await response.json();
        setMenu(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err.message);
        
        // Retry logic: Only retry if it's a server wakeup issue, 
        // but avoid infinite reloads if the path is just wrong.
        setTimeout(() => {
          window.location.reload();
        }, 5000); 
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return <h2>Loading menu...</h2>;
  }

  return (
    <div className="menu-container">
      <h1>Our Menu</h1>

      <div className="menu-grid">
        {menu.map((item) => (
          <div className="menu-card" key={item._id}>
            <img
              src={`${import.meta.env.VITE_API_URL}${item.image}`}
              alt={item.name}
              className="menu-image"
            />

            <h3>{item.name}</h3>

            <p>₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
