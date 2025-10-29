import React, { useEffect, useState } from "react";
import "../Style/final.css";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router";

function Final() {
  const navigate = useNavigate();
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      localStorage.removeItem("userDetails"); 
      localStorage.removeItem("orderDetails"); 
      navigate("/"); 
      return;
    }

    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, navigate]);

  return (
    <div className="final-container">
      <div className="thank-you-section">
        <h1>Thank You</h1>
        <IoIosCheckmarkCircleOutline className="checkmark" />
      </div>
      <div className="redirect-count">
        Redirecting to home page in {count}
      </div>
    </div>
  );
}

export default Final;