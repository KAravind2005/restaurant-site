import { useEffect, useState } from "react";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/menu`)
      .then((res) => res.json())
      .then((data) => {
        setMenu(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
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
              src={item.image}
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
