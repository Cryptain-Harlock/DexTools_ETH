import { Box, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      as="footer"
      p={8}
      borderTop="1px solid #ffffff22"
      position="relative"
      bottom={0}
      textAlign="center"
    >
      <Text fontSize="sm" color="gray.500">
        © 2024 All rights reserved.
      </Text>
    </Box>
  );
}
