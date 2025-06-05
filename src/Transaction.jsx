import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Transaction = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [transaction, setTransaction] = useState([]);

  const fetchTransaction = async () => {
    try {
      const response = await axios.get(apiUrl + "/account/transaction", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(response);
      const sortedTransactions = response.data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setTransaction(sortedTransactions);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Something Went Wrong");
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  return (
    <div className="w-full min-h-screen px-4 py-6 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-4 text-center text-gray-700">
        Transaction History
      </h1>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="py-3 px-4 border-b text-left">#</th>
              <th className="py-3 px-4 border-b text-left">
                Sender / Receiver
              </th>
              <th className="py-3 px-4 border-b text-left">Amount</th>
              <th className="py-3 px-4 border-b text-left">Prev Balance</th>
              <th className="py-3 px-4 border-b text-left">New Balance</th>
              <th className="py-3 px-4 border-b text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {transaction.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No transactions found.
                </td>
              </tr>
            ) : (
              transaction.map((transact, index) => (
                <tr
                  key={index}
                  className="text-sm text-gray-700 hover:bg-gray-50"
                >
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">
                    {transact.role === "receiver" ? (
                      <span className="text-green-600 font-medium">
                        Received from {transact.name}
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium">
                        Sent to {transact.name}
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {transact.role === "receiver" ? (
                      <span className="text-green-600 font-semibold">
                        + ₹{transact.amount}
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        - ₹{transact.amount}
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    ₹{transact.prevBalance}
                  </td>
                  <td className="py-2 px-4 border-b">₹{transact.newBalance}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(transact.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;
