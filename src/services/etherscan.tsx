import { Alchemy, Network } from "alchemy-sdk";
import axios from "axios";

const settings = {
  apiKey: "lBsnumlNVsOQUAoLYFwEFlnLkqYmkISK",
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

const ETHERSCAN_API_KEY = "BXKUFP7BSAGP8KGDUFKKJEYZ7K96MK5XSU";

export const fetchTokenTransfers = async (tokenAddress: any) => {
  const metadata = await alchemy.core.getTokenMetadata(tokenAddress);

  console.log("Token Metadata: ");
  console.log(metadata);
  return metadata;
};
// export const fetchTokenTransfers = async (tokenAddress: any) => {
//   const response = await axios.get(
//     `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${tokenAddress}&offset=10&apikey=${ETHERSCAN_API_KEY}`
//   );

//   return response.data.result;
// };
