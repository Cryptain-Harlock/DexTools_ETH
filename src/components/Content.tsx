import { useEffect, useState } from "react";
import axios from "axios";
import { LoadingSpinner } from "./BeatLoader";

export default function Content() {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              category: "ethereum-ecosystem",
              order: "market_cap_desc",
              per_page: 100, // Limit to 100 tokens per page
              page: 1, // Change this to fetch additional pages if needed
              sparkline: false,
            },
          }
        );

        setTokens(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching token data:", error);
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  return (
    <main className="flex-1 p-6">
      {/* <Add />
        <Delete /> */}
      <div className="overflow-x-auto">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <table className="min-w-full shadow">
            <thead>
              <tr className="bg-[#142028] text-sm border border-[#142028] rounded-md">
                <th className="py-3 px-6 text-left">No</th>
                <th className="py-3 px-6 text-left">Token</th>
                <th className="py-3 px-6 text-left">Symbol</th>
                <th className="py-3 px-6 text-left">Price (USD)</th>
                <th className="py-3 px-6 text-left">24h Change (%)</th>
                <th className="py-3 px-6 text-left">Volume (24h)</th>
                <th className="py-3 px-6 text-left">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token: any, index) => (
                <tr
                  key={token.id}
                  className="border-b border-solid border-[#142028] hover:bg-[#142028]"
                >
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6 flex items-center">
                    <img
                      src={token.image}
                      alt={token.name}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    {token.name}
                  </td>
                  <td className="py-3 px-6">{token.symbol.toUpperCase()}</td>
                  <td className="py-3 px-6">
                    ${token.current_price.toFixed(2)}
                  </td>
                  <td
                    className={`py-3 px-6 ${
                      token.price_change_percentage_24h < 0
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {token.price_change_percentage_24h?.toFixed(2)}%
                  </td>
                  <td className="py-3 px-6">
                    ${token.total_volume.toLocaleString()}
                  </td>
                  <td className="py-3 px-6">
                    ${token.market_cap.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
