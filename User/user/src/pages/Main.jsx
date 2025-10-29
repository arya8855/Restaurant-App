import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import Order from "../components/Order";
import Instructions from "../components/Instruction";
import DineIn from "../components/DineIn";
import TakeAway from "../components/TakeAway";
import { FaArrowRight } from "react-icons/fa";
import "../Style/home.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Main() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialCount = location.state;

  const [items, setItems] = useState(initialCount || {});
  const [selectedOption, setSelectedOption] = useState("DineIn");
  const [instructions, setInstructions] = useState("");

  const swipeRef = useRef(null);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  //Calculate totals
  const totalPrice = Object.values(items).reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalQty = Object.values(items).reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const totalTime = Object.values(items).reduce(
    (acc, item) => acc + item.time * item.quantity,
    0
  );
  const avgPrepTime = totalQty > 0 ? Math.floor(totalTime / totalQty) + 15 : 15;

  //Swipe logic
  const startDrag = (clientX) => {
    setIsDragging(true);
    setIsResetting(false);
    updateDrag(clientX);
  };

  const updateDrag = (clientX) => {
    if (!isDragging) return;
    const rect = swipeRef.current.getBoundingClientRect();
    let x = clientX - rect.left - 30;
    if (x < 0) x = 0;
    if (x > rect.width - 60) x = rect.width - 60;
    setDragX(x);
  };

  const resetSwipe = () => {
    setIsResetting(true);
    setDragX(0);
    setTimeout(() => setIsResetting(false), 300);
  };

  const submitOrder = async () => {
    try {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      if (!userDetails) {
        toast.error("User details missing!", {
          position: "top-center",
          autoClose: 3000,
        });
        resetSwipe();
        return;
      }

      const dishOrdered = Object.entries(items).map(([_, dish]) => ({
        dishId: dish._id,
        dishName: dish.name,
        dishCategory: dish.category || "Uncategorized",
        dishPrice: dish.price,
        dishPrepTime: dish.time || 10,
        dishQuantity: dish.quantity,
      }));

      const orderBody = {
        customerName: userDetails.name,
        customerMobileNumber: userDetails.phoneNumber,
        numberOfPeople: userDetails.numberOfPeople,
        dishOrdered,
        orderType: selectedOption === "DineIn" ? "Dine In" : "Take Away",
        customerAddress:
          selectedOption === "TakeAway" ? userDetails.address : null,
        orderPrice: totalPrice,
        orderPrepTime: avgPrepTime,
        orderCookingInstructions: instructions,
        orderNumber: Math.floor(Math.random() * 100000), 
      };

      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderBody),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Order placed successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => navigate("/final"), 2000);
      } else {
        toast.error(data.message || "Failed to place order", {
          position: "top-center",
          autoClose: 3000,
        });
        resetSwipe();
      }
    } catch (err) {
      console.error(err);
      toast.error("Error submitting order", {
        position: "top-center",
        autoClose: 3000,
      });
      resetSwipe();
    }
  };

  const endDrag = async () => {
    if (!isDragging) return;
    const rect = swipeRef.current.getBoundingClientRect();
    if (dragX > rect.width - 80) {
      await submitOrder();
    } else {
      resetSwipe();
    }
    setIsDragging(false);
  };

  const handleMouseDown = (e) => startDrag(e.clientX);
  const handleMouseMove = (e) => updateDrag(e.clientX);
  const handleMouseUp = () => endDrag();
  const handleTouchStart = (e) => startDrag(e.touches[0].clientX);
  const handleTouchMove = (e) => updateDrag(e.touches[0].clientX);
  const handleTouchEnd = () => endDrag();

  return (
    <div className="app-container">
      <div className="headings">
        <h2>Welcome 😊</h2>
        <h3>Place your order here...</h3>
      </div>

      <Order count={items} setCount={setItems} />

      <Instructions value={instructions} setValue={setInstructions} />
      <div className="toggle-container">
        <button
          className={`toggle-btn ${
            selectedOption === "DineIn" ? "active" : ""
          }`}
          onClick={() => setSelectedOption("DineIn")}
        >
          DineIn
        </button>
        <button
          className={`toggle-btn ${
            selectedOption === "TakeAway" ? "active" : ""
          }`}
          onClick={() => setSelectedOption("TakeAway")}
        >
          TakeAway
        </button>
      </div>

      <div className="option-container">
        {selectedOption === "DineIn" && <DineIn total={totalPrice} />}
        {selectedOption === "TakeAway" && (
          <TakeAway total={totalPrice} time={avgPrepTime} />
        )}
      </div>
      <div
        className="swipe-container"
        ref={swipeRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="swipe-btn"
          style={{
            transform: `translateX(${dragX}px)`,
            transition: isResetting ? "transform 0.3s ease" : "none",
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <FaArrowRight />
        </div>
        <span className="swipe-text">Swipe to Submit</span>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Main;
