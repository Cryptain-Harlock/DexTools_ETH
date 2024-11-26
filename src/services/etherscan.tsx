import axios from "axios";

const ETHERSCAN_API_KEY = "BXKUFP7BSAGP8KGDUFKKJEYZ7K96MK5XSU";

export const fetchTokenTransfers = async (tokenAddress: any) => {
    const response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${tokenAddress}&offset=10&apikey=${ETHERSCAN_API_KEY}`
    );
  
    return response.data.result;
  };
  