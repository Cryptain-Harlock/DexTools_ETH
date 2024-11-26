import { useEffect, useState } from "react";
import { Box, Flex, Link, Button, IconButton, Image } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { HamburgerIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [showBorder, setShowBorder] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBorder(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      w="100%"
      boxShadow={showBorder ? "md" : "none"}
      borderBottom={showBorder ? "1px solid" : "none"}
      borderColor="#ffffff22"
      transition="border 0.3s ease"
      zIndex="10"
      style={{ backdropFilter: "blur(10px)" }}
    >
      <Flex maxW="1440px" align="center" justify="space-between" p={4} px={6}>
        <Link as={NavLink} to="/" mx={{ base: "auto", md: 0 }}>
          Token Detector
        </Link>

        <Flex align="center" display={{ base: "none", md: "flex" }}>
          {["Modul1", "Module2", "Module3", "Module4"].map((label, index) => (
            <Button
              key={index}
              as={NavLink}
              to={`/${label.toLowerCase()}`}
              variant="ghost"
              colorScheme="gray"
              mx={0}
            >
              {label}
            </Button>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}
