import React, { useState, useEffect } from "react";
import axios from 'axios';


const PasswordReset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setError("Missing token. Please check the reset link.");
    }
  }, []);

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) return;
    const formData = {
      token: token,
      newPassword: password,
    };
    try {
      const res = await axios.post('/resetpassword', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      setSuccess('Password has been reset successfully');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setError('Error resetting password. Please try again.');
    }
  };

  return (
    <div className="bg-slate-400 text-white flex justify-center items-center h-screen">
      <div className="w-full max-w-sm mt-12 p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-center mb-6 text-xl font-bold">Reset Your Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 font-semibold text-gray-300">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="confirmPassword" className="block mb-2 font-semibold text-gray-300">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="mt-4 text-center font-bold text-red-500">{error}</p>}
          {success && <p className="mt-4 text-center font-bold text-green-500">{success}</p>}
          <button type="submit" className="w-full p-3 mt-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
