import Navbar from "../components/Navbar";
import "../styles/Website.css";

function About() {
  return (
    <>
      <Navbar />

      <div className="page about">
        <h1>About Spicy Bite</h1>

        <p>
          Spicy Bite is a modern restaurant offering fresh food,
          fast service and affordable pricing. Our goal is to
          deliver delicious meals with great quality.
        </p>
      </div>
    </>
  );
}

export default About;