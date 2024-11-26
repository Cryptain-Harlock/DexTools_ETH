import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTokenTransfers } from "../services/etherscan"; // Make sure to adjust the import based on your file structure
import { LoadingSpinner } from "../components/BeatLoader";

export default function TokenInfo() {
  const { tokenAddress } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetchTokenTransfers(tokenAddress);
        if (response.length > 0) {
          const formattedTransactions = response.map((tx: any) => ({
            date: new Date(tx.timeStamp * 1000).toLocaleString(),
            amount: tx.value / Math.pow(10, tx.tokenDecimal),
            usdEquivalent: calculateUSDEquivalent(tx),
            priceAtTransaction: calculatePrice(tx),
            type:
              tx.to.toLowerCase() === tokenAddress?.toLowerCase()
                ? "Buy"
                : "Sell",
            wallet: tx.from,
            pnl: calculatePNL(tx),
          }));

          setTransactions(formattedTransactions);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [tokenAddress]);

  // Helper functions (implement logic if not done in etherscan.js)
  const calculateUSDEquivalent = (tx: any) => {
    return (tx.value / Math.pow(10, tx.tokenDecimal)) * tx.price;
  };

  const calculatePrice = (tx: any) => {
    return tx.price;
  };

  const calculatePNL = (tx: any) => {
    return 0; // Placeholder
  };

  return (
    <main className="flex-1 p-6">
      <div className="overflow-x-auto">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <table className="min-w-full shadow">
              <thead>
                <tr className="bg-[#142028] text-sm border border-[#142028] rounded-md">
                  <th className="py-3 px-6 text-left">Date and Time</th>
                  <th className="py-3 px-6 text-left">Amount</th>
                  <th className="py-3 px-6 text-left">USD Equivalent</th>
                  <th className="py-3 px-6 text-left">Price at Transaction</th>
                  <th className="py-3 px-6 text-left">Type</th>
                  <th className="py-3 px-6 text-left">Wallet</th>
                  <th className="py-3 px-6 text-left">PNL</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx: any, index) => (
                  <tr
                    key={index}
                    className="border-b border-solid border-[#142028] hover:bg-[#142028]"
                    style={{ color: tx.type === "Buy" ? "#cdffe7" : "#ffacb1" }}
                  >
                    <td className="py-3 px-6">{tx.date}</td>
                    <td className="py-3 px-6">{tx.amount}</td>
                    <td className="py-3 px-6">
                      ${(tx.usdEquivalent || 0).toFixed(2)}
                    </td>
                    <td className="py-3 px-6">
                      ${(tx.priceAtTransaction || 0).toFixed(2)}
                    </td>
                    <td
                      className="py-3 px-6"
                      style={{
                        color: tx.type === "Buy" ? "#ea3943" : "#17c671",
                      }}
                    >
                      {tx.type}
                    </td>
                    <td className="py-3 px-6">{tx.wallet}</td>
                    <td className="py-3 px-6">{tx.pnl.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </main>
  );
}
