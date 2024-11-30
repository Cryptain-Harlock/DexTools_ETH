import { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  Box,
  Flex,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { LoadingSpinner } from "../components/BeatLoader";

type TokenType = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
};

export function Dashboard() {
  const [tokens, setTokens] = useState<TokenType[]>([]); // Explicitly define the type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      setLoading(true);

      try {
        const provider = new ethers.JsonRpcProvider(
          "https://eth-mainnet.g.alchemy.com/v2/lBsnumlNVsOQUAoLYFwEFlnLkqYmkISK"
        );

        const factoryAddress = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
        const factoryAbi = [
          "function allPairsLength() view returns (uint256)",
          "function allPairs(uint256) view returns (address)",
        ];
        const pairAbi = [
          "function token0() view returns (address)",
          "function token1() view returns (address)",
        ];

        const factoryContract = new ethers.Contract(
          factoryAddress,
          factoryAbi,
          provider
        );

        const totalPairs = await factoryContract.allPairsLength();
        const pairsToFetch = 10n;

        const recentTokens: TokenType[] = []; // Specify the type here
        const fetchTokenData = async (address: string): Promise<TokenType> => {
          const tokenAbi = [
            "function name() view returns (string)",
            "function symbol() view returns (string)",
            "function decimals() view returns (uint8)",
          ];
          const tokenContract = new ethers.Contract(
            address,
            tokenAbi,
            provider
          );

          const [name, symbol, decimals] = await Promise.all([
            tokenContract.name(),
            tokenContract.symbol(),
            tokenContract.decimals(),
          ]);

          return { address, name, symbol, decimals };
        };

        for (let i = totalPairs - pairsToFetch; i < totalPairs; i++) {
          const pairAddress = await factoryContract.allPairs(i);
          const pairContract = new ethers.Contract(
            pairAddress,
            pairAbi,
            provider
          );

          const [token0Address, token1Address] = await Promise.all([
            pairContract.token0(),
            pairContract.token1(),
          ]);

          const [token0, token1] = await Promise.all([
            fetchTokenData(token0Address),
            fetchTokenData(token1Address),
          ]);

          recentTokens.push(token0, token1);
        }

        setTokens(recentTokens); // Now works correctly
      } catch (error) {
        console.error("Error fetching token data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  return (
    <Box w="100%" px={{ base: 8, md: 20 }} mt={100} mb={20}>
      <Flex align="center" justify="center" flexDirection="column">
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Token</Th>
                <Th>Symbol</Th>
                <Th>Address</Th>
              </Tr>
            </Thead>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <Tbody>
                {tokens.map((token, index) => (
                  <Tr key={token.address}>
                    <Td>{index + 1}</Td>
                    <Td>{token.name || "Unknown"}</Td>
                    <Td>{token.symbol || "N/A"}</Td>
                    <Td>{token.address}</Td>
                  </Tr>
                ))}
              </Tbody>
            )}
          </Table>
        </TableContainer>
      </Flex>
    </Box>
  );
}
