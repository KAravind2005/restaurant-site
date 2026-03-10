import express from "express";

const router = express.Router();

const menu = [
  {
    name: "Chicken Biryani",
    price: 220,
    image: "/images/biryani.jpeg"
  },
  {
    name: "Paneer Butter Masala",
    price: 180,
    image: "/images/paneer.jpeg"
  },
  {
    name: "Fried Rice",
    price: 150,
    image: "/images/rice.jpeg"
  },
  {
    name: "Masala Dosa",
    price: 260,
    image: "/images/masala-dosa.jpeg"
  }
];

router.get("/", (req, res) => {
  res.json(menu);
});

export default router;