import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    shopName: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/api/auth/register",
        formData
      );

      localStorage.setItem("token", res.data.token);

      alert("Registration Successful");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert("Registration Failed");
    }
  };

  return (
  <div className="min-h-screen flex">

    {/* Left Section */}
    <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 text-white items-center justify-center p-10">

      <div>

        <h1 className="text-6xl font-bold mb-6">
          Join Udhaar Khata
        </h1>

        <p className="text-xl leading-10 text-gray-200">
          Create your smart digital finance management account and manage customers, transactions, analytics, and AI insights.
        </p>

      </div>

    </div>

    {/* Right Section */}
    <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-10">

      <div className="w-full max-w-lg bg-white/40 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-10">

        <h2 className="text-4xl font-bold mb-2 text-center">
          Create Account
        </h2>

        <p className="text-gray-500 text-center mb-8">
          Register to continue
        </p>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-4 rounded-xl border mb-4 outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-4 rounded-xl border mb-4 outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-4 rounded-xl border mb-4 outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Phone */}
        <input
          type="text"
          name="phone"
          placeholder="Enter Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-4 rounded-xl border mb-4 outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Shop Name */}
        <input
          type="text"
          name="shopName"
          placeholder="Enter Shop Name"
          value={formData.shopName}
          onChange={handleChange}
          className="w-full p-4 rounded-xl border mb-6 outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Register Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-all duration-300"
        >
          Register
        </button>

       

        {/* Login Link */}
        <p className="text-center mt-10 text-gray-600">

          Already have an account?

          <span
            onClick={() =>
              navigate("/")
            }
            className="text-purple-600 font-semibold cursor-pointer ml-2"
          >
            Login
          </span>

        </p>

      </div>

    </div>

  </div>
);
}

export default Register;