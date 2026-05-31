import {
  FaUsers,
  FaChartBar,
  FaFilePdf,
  FaRobot,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const navigate = useNavigate();

  return (
    <div
  className={`fixed md:relative z-50 w-72 min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white p-6 shadow-2xl transform transition-transform duration-300 ${
    sidebarOpen
      ? "translate-x-0"
      : "-translate-x-full md:translate-x-0"
  }`}
>
  <div className="flex justify-end md:hidden mb-4">

  <button
    onClick={() =>
      setSidebarOpen(false)
    }
    className="text-2xl"
  >
    ✕
  </button>

</div>

      {/* Logo */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-wide">
          Udhaar
        </h1>

        <p className="text-gray-400 mt-2">
          Smart Finance Manager
        </p>
      </div>

      {/* Navigation */}
      <div className="space-y-4">

        <button
          onClick={() =>
            navigate("/dashboard")
          }
          className="flex items-center gap-4 w-full p-4 rounded-xl bg-gray-800 hover:bg-blue-600 transition-all duration-300"
        >
          <FaChartBar size={20} />

          <span className="text-lg">
            Dashboard
          </span>
        </button>

        <button
          onClick={() =>
            navigate("/customers")
          }
          className="flex items-center gap-4 w-full p-4 rounded-xl bg-gray-800 hover:bg-green-600 transition-all duration-300"
        >
          <FaUsers size={20} />

          <span className="text-lg">
            Customers
          </span>
        </button>

        

       <button
  onClick={() => {
    navigate("/dashboard");

    setTimeout(() => {
      document
        .getElementById("reports-section")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 100);
  }}
  className="flex items-center gap-4 w-full p-4 rounded-xl bg-gray-800 hover:bg-red-600 transition-all duration-300"
>
  <FaFilePdf size={20} />

  <span className="text-lg">
    Reports
  </span>
</button>

     <button
  onClick={() => {
    navigate("/dashboard");

    setTimeout(() => {
      document
        .getElementById("ai-section")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 100);
  }}
  className="flex items-center gap-4 w-full p-4 rounded-xl bg-gray-800 hover:bg-purple-600 transition-all duration-300"
>
  <FaRobot size={20} />

  <span className="text-lg">
    AI Insights
  </span>
</button>   

      </div>

      {/* Bottom Card */}
      <div className="mt-16 bg-gray-800 p-5 rounded-2xl">

        <h2 className="text-xl font-semibold mb-2">
          Business Status
        </h2>

        <p className="text-gray-400 text-sm leading-6">
          Your finance dashboard is active and tracking customer transactions efficiently.
        </p>

      </div>

    </div>
  );
}

export default Sidebar;