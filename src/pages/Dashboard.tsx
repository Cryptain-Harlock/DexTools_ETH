import { Box, Heading, Text, Flex, Button, VStack, Image, Divider } from "@chakra-ui/react";

export function Dashboard() {
  return (
    <Box w="100%" px={{ base: 8, md: 20 }} my={70}>
      <Flex h="100vh" align="center" justify="center" px={4} textAlign="center" flexDirection="column">
        <Heading as="h1" fontSize={{ base: "4xl", lg: "6xl", xl: "6xl" }} mb={4} fontWeight="bold">
          LaunchB0xx
        </Heading>
        <Text size={{ base: "4lg", md: "lg", lg: "4lg" }} mb={6}>
          Here is your workbench for creating an online presence. Your project will go far if you use these tools to
          spread the word.
        </Text>
      </Flex>
    </Box>
  );
}
