import { Link } from "react-router-dom";
import "../styles/Website.css"; // we will create this
import Navbar from "../components/Navbar"; // we will create this

function Home() {
  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Spicy Bite</h1>
          <p>Fresh Food • Fast Service • Affordable Price</p>

          <Link to="/menu" className="btn">
            View Menu
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
