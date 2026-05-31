import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";

function Login() {
  const navigate = useNavigate();
  

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        "/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert("Invalid Credentials");
    }
  };

  return (
  <div className="min-h-screen flex">

    {/* Left Section */}
    <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white items-center justify-center p-10">

      <div>

        <h1 className="text-6xl font-bold mb-6">
          Digital Udhaar Khata
        </h1>

        <p className="text-xl leading-10 text-gray-200">
          Smart finance management for shopkeepers with AI-powered analytics and customer ledger tracking.
        </p>

      </div>

    </div>

    {/* Right Section */}
    <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-10">

      <div className="w-full max-w-md bg-white/40 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-10">

        <h2 className="text-4xl font-bold mb-2 text-center">
          Welcome Back
        </h2>

        <p className="text-gray-500 text-center mb-8">
          Login to continue
        </p>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-4 rounded-xl border mb-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-4 rounded-xl border mb-6 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Login Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-all duration-300"
        >
          Login
        </button>

     

        {/* Register */}
        <p className="text-center mt-10 text-gray-600">

          Don't have an account?

          <span
            onClick={() =>
              navigate("/register")
            }
            className="text-blue-600 font-semibold cursor-pointer ml-2"
          >
            Register
          </span>

        </p>

      </div>

    </div>

  </div>
);
}

export default Login;