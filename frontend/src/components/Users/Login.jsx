import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Modal from "../Modal";
import robotGif from "../../assets/robot.gif";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [modal, setModal] = useState({ show: false, message: "" });

  const handleChange = (e) =>
    setData({ ...data, [e.target.id]: e.target.value });

  const closeModal = () => setModal({ show: false, message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5002/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      const result = await res.json();
      if (res.ok) {
        setModal({ show: true, message: result.message || "Login successful!" });
        setData({ email: "", password: "" });
      } else if (res.status === 404) {
        setModal({ show: true, message: result.message || "User not found. Please register first!" });
        setData({ email: "", password: "" });
      } else {
        setModal({ show: true, message: result.message || "Login failed" });
      }
    } catch (error) {
      setModal({ show: true, message: error.message });
    }
  };
  

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto my-10 bg-emerald-50 p-6 rounded-xl shadow-lg space-y-6 border border-gray-300">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Login</h2>
        <p className="text-sm text-center text-gray-500">Sign in to access your account</p>
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-[#4a4a66] rounded-full flex items-center justify-center shadow-lg">
            <img src={robotGif} alt="Robot Animation" className="w-30 h-30 rounded-full" />
          </div>
        </div>
        <div className="relative">
          <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
          <input id="email" type="email" placeholder="Email" value={data.email} onChange={handleChange} className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
        </div>
        <div className="relative">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input id="password" type="password" placeholder="Password" value={data.password} onChange={handleChange} className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out">
          Login
        </button>
      </form>
      {modal.show && <Modal message={modal.message}  onClose={closeModal} />}
    </>
  );
};

export default LoginForm;
