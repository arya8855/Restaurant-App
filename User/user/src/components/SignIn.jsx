import React, { useState } from "react";
import "../Style/signin.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SingIn({ onSubmit }) {
  const [formData, setFormData] = useState({
    customerName: "",
    numberOfPeople: "",
    customerAddress: "",
    customerMobileNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.customerName ||
      !formData.numberOfPeople ||
      !formData.customerAddress ||
      !formData.customerMobileNumber
    ) {
      toast.error("Please fill all the fields", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    localStorage.setItem("userDetails", JSON.stringify(formData));

    toast.success("Details saved successfully!", {
      position: "top-center",
      autoClose: 2000,
    });
    onSubmit();
  };

  return (
    <div className="signin-overlay">
      <div className="signin-popup">
        <h3>Enter Your Details</h3>
        <form onSubmit={handleSubmit}>
        <label htmlFor="">Name</label>
          <input
            type="text"
            name="customerName"
            placeholder="Name"
            value={formData.customerName}
            onChange={handleChange}
          />
          <label htmlFor="">Number of peron</label>
          <input
            type="number"
            name="numberOfPeople"
            placeholder="2 4 6"
            value={formData.numberOfPeople}
            onChange={handleChange}
          />
          <label htmlFor="">Address</label>
          <input
            type="text"
            name="customerAddress"
            placeholder="Address"
            value={formData.customerAddress}
            onChange={handleChange}
          />
          <label htmlFor="">Contact</label>
          <input
            type="text"
            name="customerMobileNumber"
            placeholder="Phone Number"
            value={formData.customerMobileNumber}
            onChange={handleChange}
          />
          <button type="submit">Order Now</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SingIn;