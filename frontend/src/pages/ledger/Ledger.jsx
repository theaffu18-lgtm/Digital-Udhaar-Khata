import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import API from "../../services/api";
import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

function Ledger() {
  const { customerId } = useParams();

  const [transactions, setTransactions] =
    useState([]);

  const [formData, setFormData] = useState({
    type: "credit",
    amount: "",
    note: "",
  });

  // Fetch Transactions
  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(
        `/transactions/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add Transaction
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/transactions",
        {
          customerId,
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      alert("Transaction Added");

      setFormData({
        type: "credit",
        amount: "",
        note: "",
      });

      fetchTransactions();
    } catch (error) {
      console.log(error);

      alert("Failed");
    }
  };
  const downloadPDF = () => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(20);

  doc.text(
    "Digital Udhaar Khata Report",
    20,
    20
  );

  // Customer ID
  doc.setFontSize(12);

  doc.text(
    `Customer ID: ${customerId}`,
    20,
    35
  );

  // Table
  autoTable(doc, {
    startY: 50,

    head: [
      ["Type", "Amount", "Note", "Date"],
    ],

    body: transactions.map(
      (transaction) => [
        transaction.type,

        `₹ ${transaction.amount}`,

        transaction.note,

        new Date(
          transaction.createdAt
        ).toLocaleDateString(),
      ]
    ),
  });

  // Save PDF
  doc.save("ledger-report.pdf");
};


  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="flex justify-between items-center mb-8">

  <h1 className="text-4xl font-bold">
    Customer Ledger
  </h1>

  <button
    onClick={downloadPDF}
    className="bg-green-600 text-white px-4 py-2 rounded-lg"
  >
    Download PDF
  </button>

</div>

      {/* Add Transaction */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          Add Transaction
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="credit">
              Credit
            </option>

            <option value="payment">
              Payment
            </option>
          </select>

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="note"
            placeholder="Note"
            value={formData.note}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <button
            className="bg-blue-600 text-white p-3 rounded-lg"
          >
            Add
          </button>
        </form>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">
                Type
              </th>

              <th className="p-4 text-left">
                Amount
              </th>

              <th className="p-4 text-left">
                Note
              </th>

              <th className="p-4 text-left">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction._id}
                className="border-t"
              >
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      transaction.type ===
                      "credit"
                        ? "bg-red-500"
                        : "bg-green-600"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </td>

                <td className="p-4">
                  ₹ {transaction.amount}
                </td>

                <td className="p-4">
                  {transaction.note}
                </td>

                <td className="p-4">
                  {new Date(
                    transaction.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Ledger;