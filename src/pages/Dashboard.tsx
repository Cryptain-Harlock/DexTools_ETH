import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  VStack,
  Image,
  Divider,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { LoadingSpinner } from "../components/BeatLoader";

export function Dashboard() {
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
    <Box w="100%" px={{ base: 8, md: 20 }} my={70}>
      <Flex
        align="center"
        justify="center"
        px={4}
        textAlign="center"
        flexDirection="column"
      >
        <Box>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>No</Th>
                    <Th>Token</Th>
                    <Th>Symbol</Th>
                    <Th>Price (USD)</Th>
                    <Th>24h Change (%)</Th>
                    <Th>Volume (24h)</Th>
                    <Th>Market Cap</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {tokens.map((token: any, index) => (
                    <Tr key={token.id}>
                      <Td>{index + 1}</Td>
                      <Td>
                        <Flex align="center">
                          <Image
                            src={token.image}
                            alt={token.name}
                            boxSize="32px" // Sets a consistent image size
                            borderRadius="full"
                            mr={2} // Adds space between the image and text
                            fallbackSrc="https://via.placeholder.com/32" // Placeholder if the image fails to load
                          />
                          <Text fontWeight="medium">{token.name}</Text>
                        </Flex>
                      </Td>
                      <Td>{token.symbol.toUpperCase()}</Td>
                      <Td>${token.current_price.toFixed(2)}</Td>
                      <Td
                        color={
                          token.price_change_percentage_24h < 0
                            ? "red.500"
                            : "green.500"
                        }
                      >
                        {token.price_change_percentage_24h?.toFixed(2)}%
                      </Td>
                      <Td>${token.total_volume.toLocaleString()}</Td>
                      <Td>${token.market_cap.toLocaleString()}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
