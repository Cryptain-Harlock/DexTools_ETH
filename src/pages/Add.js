import React, { useEffect, useState } from "react";
import axios from "axios";
import { LoadingSpinner } from "../components/BeatLoader";

const Add = () => {
  const [addedTokens, setAddedTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddedTokens = async () => {
      try {
        // Assuming there's an API endpoint for fetching added tokens
        const response = await axios.get("YOUR_API_ENDPOINT_FOR_ADDED_TOKENS");
        setAddedTokens(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching added tokens:", error);
        setLoading(false);
      }
    };

    fetchAddedTokens();
  }, []);

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Added Tokens</h2>
      {loading ? (
        <LoadingSpinner />
      ) : (
        // <div className="flex flex-col">
        //     <div className="flex ">
        //         <div className=""><img src={token.image} alt={token.name} className="w-6 h-6 rounded-full mr-2" /></div>
        //         <div className="fles flex-col">
        //             <div></div>
        //             <div></div>
        //         </div>
        //         <div>
        //             <div></div>
        //             <div></div>
        //         </div>
        //     </div>
        //     <div></div>
        // </div>
        <table className="min-w-full shadow">
          <thead>
            <tr className="bg-[#142028] text-sm border border-[#142028] rounded-md">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Token Name</th>
              <th className="py-3 px-6 text-left">Token Address</th>
              <th className="py-3 px-6 text-left">Date Added</th>
            </tr>
          </thead>
          <tbody>
            {addedTokens.map((token, index) => (
              <tr key={token.id} className="border-b border-solid border-[#142028] hover:bg-[#142028]">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{token.name}</td>
                <td className="py-3 px-6">{token.address}</td>
                <td className="py-3 px-6">{new Date(token.dateAdded).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Add;
