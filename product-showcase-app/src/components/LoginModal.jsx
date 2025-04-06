import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const LoginModal = ({ isOpen, onLogin, loginError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ username, password });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-tr from-indigo-100 to-indigo-200 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold text-center mb-1">Log in to Your Account</h2>
        <p className="text-sm font-medium text-center text-gray-700 mb-4">Log in to Your Account</p>
        <hr className="mb-6" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-800">Username or email</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-800">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {loginError && (
            <p className="text-red-500 text-sm font-medium">{loginError}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded-md shadow hover:bg-blue-900 transition duration-200"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">Or sign in with</div>

        <button className="w-full flex items-center justify-center mt-2 p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-200">
          <FcGoogle className="mr-2" size={20} />
          Google
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
