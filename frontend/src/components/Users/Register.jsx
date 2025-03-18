import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Modal from "../Modal";

const RegisterForm = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [modal, setModal] = useState({ show: false, message: "" });

  const handleChange = (e) => setData({ ...data, [e.target.id]: e.target.value });
  const closeModal = () => setModal({ show: false, message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmpassword) {
      setModal({ show: true, message: "Passwords do not match" });
      return;
    }
    try {
      const res = await fetch("http://localhost:5002/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.username,
          email: data.email,
          password: data.password,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        setModal({ show: true, message: result.message || "Registration successful!" });
        setData({ username: "", email: "", password: "", confirmpassword: "" });
      } else {
        setModal({ show: true, message: result.message || "Registration failed" });
      }
    } catch (error) {
      setModal({ show: true, message: "Error connecting to server" });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto my-10 bg-emerald-50 p-6 rounded-xl shadow-lg space-y-6 border border-gray-300">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Register</h2>
        <p className="text-sm text-center text-gray-500">Glad to have you here.</p>
        <div className="relative">
          <FaUser className="absolute top-3 left-3 text-gray-400" />
          <input id="username" type="text" placeholder="Username" value={data.username} onChange={handleChange} className="pl-10 pr-4 py-2 w-full rounded-md border" />
        </div>
        <div className="relative">
          <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
          <input id="email" type="email" placeholder="Email" value={data.email} onChange={handleChange} className="pl-10 pr-4 py-2 w-full rounded-md border" />
        </div>
        <div className="relative">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input id="password" type="password" placeholder="Password" value={data.password} onChange={handleChange} className="pl-10 pr-4 py-2 w-full rounded-md border" />
        </div>
        <div className="relative">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input id="confirmpassword" type="password" placeholder="Confirm Password" value={data.confirmpassword} onChange={handleChange} className="pl-10 pr-4 py-2 w-full rounded-md border" />
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-orange-500 text-white font-bold py-2 px-4 rounded-md">
          Register
        </button>
      </form>
      {modal.show && <Modal message={modal.message} onClose={closeModal} />}
    </>
  );
};

export default RegisterForm;
