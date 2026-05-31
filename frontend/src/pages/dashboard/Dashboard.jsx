import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../../services/api";
import Sidebar from "../../components/Sidebar";
import { FaBars } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalCredit: 0,
    totalPaid: 0,
    totalBalance: 0,
  });

const [insights, setInsights] = useState([]);
const [darkMode, setDarkMode] =
  useState(false);
  const [sidebarOpen, setSidebarOpen] =
  useState(false);
  const [profileOpen, setProfileOpen] =
  useState(false);
  const [loading, setLoading] =
  useState(true);
  const [user, setUser] = useState(null);

  // Fetch Dashboard Stats
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(
        "/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchInsights = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.get(
      "/ai/insights",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setInsights(res.data.insights);
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {

  try {

    const storedUser =
      localStorage.getItem("user");

    if (
      storedUser &&
      storedUser !== "undefined"
    ) {
      setUser(
        JSON.parse(storedUser)
      );
    }

  } catch (error) {

    console.log(
      "Invalid user data in localStorage"
    );

    localStorage.removeItem("user");
  }

  fetchStats();

  fetchInsights();

}, []);
 
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };
if (loading) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 p-10">

        {/* Skeleton Header */}
        <div className="h-20 bg-gray-300 rounded-2xl animate-pulse mb-10"></div>

        {/* Skeleton Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="h-40 bg-gray-300 rounded-2xl animate-pulse"></div>

          <div className="h-40 bg-gray-300 rounded-2xl animate-pulse"></div>

          <div className="h-40 bg-gray-300 rounded-2xl animate-pulse"></div>

          <div className="h-40 bg-gray-300 rounded-2xl animate-pulse"></div>

        </div>

      </div>

    </div>
  );
}
  return (
    <div
  className={`flex min-h-screen transition-all duration-500 ${
    darkMode
      ? "bg-gray-900 text-white"
      : "bg-gradient-to-br from-blue-100 via-white to-purple-100"
  }`}
>

  <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

  <div className="flex-1 p-10">
      {/* Header */}
     <div
  className={`flex justify-between items-center mb-10 backdrop-blur-lg border p-6 rounded-2xl shadow-xl transition-all duration-500 ${
    darkMode
      ? "bg-gray-800 border-gray-700"
      : "bg-white/40 border-white/30"
  }`}
>

  {/* Left */}
  <div className="flex items-center gap-4">

    <button
      onClick={() =>
        setSidebarOpen(true)
      }
      className="md:hidden text-2xl"
    >
      <FaBars />
    </button>

    <h1 className="text-4xl font-bold">
      Digital Udhaar Khata
    </h1>

  </div>

  {/* Right */}
  <div className="flex items-center gap-4">

    <button
      onClick={() =>
        setDarkMode(!darkMode)
      }
      className="bg-black text-white px-4 py-2 rounded-lg"
    >
      {darkMode
        ? "☀ Light"
        : "🌙 Dark"}
    </button>

    <button
      onClick={() =>
        setProfileOpen(!profileOpen)
      }
      className="text-4xl"
    >
      <FaUserCircle />
    </button>

    {/* Profile Dropdown */}
    {profileOpen && (
      <div
        className={`absolute top-24 right-10 w-64 rounded-2xl shadow-2xl p-5 z-50 ${
          darkMode
            ? "bg-gray-800"
            : "bg-white"
        }`}
      >

        <h2 className="text-xl font-bold mb-1">
          {user?.name}
        </h2>

        <p className="text-gray-500 text-sm mb-4">
          {user?.shopName}
        </p>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
        >
          Logout
        </button>

      </div>
    )}

  </div>

</div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {/* Customers */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300">
          <h2 className="text-gray-100">
            Total Customers
          </h2>

          <h1 className="text-4xl font-bold mt-2">
           {stats.totalCustomers}
          </h1>
        </div>

        {/* Credit */}
        <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300">
          <h2 className="text-gray-100">
            Total Credit
          </h2>

          <h1 className="text-4xl font-bold mt-2 ">
            ₹{stats.totalCredit}
          </h1>
        </div>

        {/* Paid */}
        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300">
          <h2 className="text-gray-100">
            Total Paid
          </h2>

          <h1 className="text-4xl font-bold mt-2">
            ₹{stats.totalPaid}
          </h1>
        </div>

        {/* Balance */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white p-6 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300">
          <h2 className="text-gray-100">
            Pending Balance
          </h2>

          <h1 className="text-4xl font-bold mt-2">
            ₹{stats.totalBalance}
          </h1>
        </div>
      </div>
      {/* Analytics Summary */}
<div
  id="reports-section"
  className={`${
  darkMode
    ? "bg-gray-800"
    : "bg-white/40"
} backdrop-blur-lg border border-white/30 p-8 rounded-2xl shadow-xl mb-10`}
>

  <h2 className="text-3xl font-bold mb-6">
    Business Summary
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    <div className="border rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-2">
        Credit Performance
      </h3>

      <p className="text-gray-300">
        Total credit given:
      </p>

      <h1 className="text-4xl font-bold text-red-500 mt-2">
        ₹ {stats.totalCredit}
      </h1>
    </div>

    <div className="border rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-2">
        Payment Collection
      </h3>

      <p className="text-gray-300">
        Total amount received:
      </p>

      <h1 className="text-4xl font-bold text-green-500 mt-2">
        ₹ {stats.totalPaid}
      </h1>
    </div>

    <div className="border rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-2">
        Pending Recovery
      </h3>

      <p className="text-gray-300">
        Pending customer balance:
      </p>

      <h1 className="text-4xl font-bold text-orange-500 mt-2">
        ₹ {stats.totalBalance}
      </h1>
    </div>

  </div>
</div>
{/* AI Insights */}
<div
  id="ai-section"
 className={`${
  darkMode
    ? "bg-gray-800"
    : "bg-white/40"
} backdrop-blur-lg border border-white/30 p-8 rounded-2xl shadow-xl mb-10`}
>

  <h2 className="text-3xl font-bold mb-6">
    AI Business Insights
  </h2>

  <div className="space-y-4">

    {insights.map((insight, index) => (
      <div
        key={index}
        className="border-l-4 border-blue-500 bg-white/30 backdrop-blur-md p-5 rounded-2xl shadow-md hover:scale-105 transition-all duration-300"
      >
        <p className="text-lg">
          {insight}
        </p>
      </div>
    ))}

  </div>
</div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Customers */}
<div className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300">

  <h2 className="text-2xl font-semibold text-blue-600 mb-4">
    Customers
  </h2>

  <p className="text-gray-600 mb-4">
    Manage all customers
  </p>

  <button
    onClick={() =>
      navigate("/customers")
    }
    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
  >
    Open Customers
  </button>

</div>

       {/* Ledger */}
<div className="bg-white p-6 rounded-xl shadow-md hover:scale-105 transition-all duration-300">

  <h2 className="text-2xl font-semibold text-orange-500 mb-4">
    Ledger
  </h2>

  <p className="text-gray-600 mb-4">
    Manage customer transactions
  </p>

  <button
    onClick={() =>
      navigate("/customers")
    }
    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
  >
    Open Ledger
  </button>

</div>

       {/* Reports */}
<div className="bg-white p-6 rounded-xl shadow-md hover:scale-105 transition-all duration-300">

  <h2 className="text-2xl font-semibold text-red-500 mb-4">
    Reports
  </h2>

  <p className="text-gray-600 mb-4">
    View business analytics
  </p>

  <button
    onClick={() => {
      document
        .getElementById("reports-section")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }}
    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
  >
    View Reports
  </button>

</div>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;