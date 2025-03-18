import React from "react";

const Modal = ({ message, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparecy bg-opacity-30 backdrop-blur-sm">
    <div className="bg-white p-4 rounded shadow-md">
      <p>{message}</p>
      <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        OK
      </button>
    </div>
  </div>
);

export default Modal;
