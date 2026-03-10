import { useEffect, useState } from "react";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/menu`)
      .then(async (res) => {
        // wait for server if it wakes up
        if (!res.ok) {
          throw new Error("API not ready yet");
        }

        const data = await res.json();
        return data;
      })
      .then((data) => {
        setMenu(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Server waking up, retrying...");

        // retry after 3 seconds
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
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
