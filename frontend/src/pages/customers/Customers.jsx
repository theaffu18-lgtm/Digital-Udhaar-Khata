import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import Sidebar from "../../components/Sidebar";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
const filteredCustomers = customers.filter(
  (customer) =>
    customer.name
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    customer.phone.includes(search)
);
  // Fetch Customers
  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/api/customers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCustomers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add Customer
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post("/api/customers", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Customer Added");

      setFormData({
        name: "",
        phone: "",
        address: "",
      });

      fetchCustomers();
    } catch (error) {
      console.log(error);

      alert("Failed to add customer");
    }
  };

  // Delete Customer
  const deleteCustomer = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/api/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCustomers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
  <div className="flex bg-gray-100 min-h-screen">

    <Sidebar />

    <div className="flex-1 p-10">
      <h1 className="text-4xl font-bold mb-8">
        Customers
      </h1>
{/* Search Bar */}
<div className="bg-white p-6 rounded-xl shadow-md mb-6">

  <input
    type="text"
    placeholder="Search by name or phone..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="w-full border p-3 rounded-lg"
  />

</div>


      {/* Add Customer Form */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          Add Customer
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Customer Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <button
            className="bg-blue-600 text-white p-3 rounded-lg"
          >
            Add Customer
          </button>
        </form>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Address</th>
              <th className="p-4 text-left">Balance</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((customer) => (
              <tr
                key={customer._id}
                className="border-t"
              >
                <td className="p-4">
                  {customer.name}
                </td>

                <td className="p-4">
                  {customer.phone}
                </td>

                <td className="p-4">
                  {customer.address}
                </td>

                <td className="p-4">
                  ₹ {customer.balance}
                </td>

                <td className="p-4">
                 <div className="flex gap-2">
  <button
    onClick={() =>
      navigate(`/ledger/${customer._id}`)
    }
    className="bg-green-600 text-white px-4 py-2 rounded-lg"
  >
    Ledger
  </button>

  <button
    onClick={() =>
      deleteCustomer(customer._id)
    }
    className="bg-red-500 text-white px-4 py-2 rounded-lg"
  >
    Delete
  </button>
</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default Customers;