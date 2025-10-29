import React, { useState, useEffect } from "react";
import '../Style/main.css';
import Display from "../components/Display";
import Signin from "../components/SignIn";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSignin, setShowSignin] = useState(false);

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (!userDetails) setShowSignin(true);
  }, []);

  const categories = [
    { name: "Burger", img: "burger.svg" },
    { name: "Pizza", img: "pizza.svg" },
    { name: "Drinks", img: "drinks.svg" },
    { name: "Pasta", img: "pasta.svg" },
    { name: "Snacks", img: "snack.svg" },
    { name: "Meals", img: "meals.svg" },
    { name: "Starters", img: "starter.svg" },
    { name: "Tiffins", img: "tiffins.svg" },
  ];

  return (
    <div className="home-page">
      <div className="headings">
        <h3>Welcome</h3>
        <p>Place your order here...</p>
      </div>

      <div className="searchbar">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>

      <div className="category">
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`items ${selectedCategory === cat.name ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat.name)}
          >
            <img src={cat.img} alt={cat.name} />
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
      <div className="scroll-container">
        <Display item={selectedCategory} search={searchTerm} />
      </div>

      {showSignin && <Signin onSubmit={() => setShowSignin(false)} />}
    </div>
  );
}

export default Home;