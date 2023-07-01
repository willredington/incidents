import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { HStack, Heading, IconButton, useColorMode } from "@chakra-ui/react";
import { Link as RLink } from "react-router-dom";

export function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack
      borderBottom={"1px"}
      borderBottomColor={"gray.200"}
      px={4}
      py={2}
      minH={"60px"}
      w="full"
      justify={"space-between"}
    >
      <HStack spacing={"10"}>
        <Heading size={"md"} as={RLink} to={"/"}>
          Incident Manager
        </Heading>
      </HStack>
      <IconButton
        onClick={toggleColorMode}
        aria-label="toggle-color-mode-btn"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      />
    </HStack>
  );
}
