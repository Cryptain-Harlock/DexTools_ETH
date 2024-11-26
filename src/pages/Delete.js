import React, { useEffect, useState } from "react";
import axios from "axios";
import { LoadingSpinner } from "../components/BeatLoader";

const Delete = () => {
  const [deletedTokens, setDeletedTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeletedTokens = async () => {
      try {
        // Assuming there's an API endpoint for fetching deleted tokens
        const response = await axios.get("YOUR_API_ENDPOINT_FOR_DELETED_TOKENS");
        setDeletedTokens(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching deleted tokens:", error);
        setLoading(false);
      }
    };

    fetchDeletedTokens();
  }, []);

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Deleted Tokens</h2>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <table className="min-w-full shadow">
          <thead>
            <tr className="bg-[#142028] text-sm border border-[#142028] rounded-md">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Token Name</th>
              <th className="py-3 px-6 text-left">Token Address</th>
              <th className="py-3 px-6 text-left">Date Deleted</th>
            </tr>
          </thead>
          <tbody>
            {deletedTokens.map((token, index) => (
              <tr key={token.id} className="border-b border-solid border-[#142028] hover:bg-[#142028]">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{token.name}</td>
                <td className="py-3 px-6">{token.address}</td>
                <td className="py-3 px-6">{new Date(token.dateDeleted).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Delete;
