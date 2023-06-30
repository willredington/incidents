import { Button, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <Container maxW={"3xl"}>
      <VStack
        textAlign={"center"}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
      >
        <Heading fontWeight={600} fontSize={"7xl"}>
          Create movies in the <br />{" "}
          <Text as={"span"} color={"green.400"}>
            blink of an eye
          </Text>
        </Heading>
        <Text color={"gray.500"}>
          Turn a simple prompt into a full fledged movie in just a few minutes
        </Text>
        <VStack spacing={3} align={"center"} alignSelf={"center"}>
          <Button
            to={"/projects"}
            as={Link}
            colorScheme={"green"}
            bg={"green.400"}
            rounded={"full"}
            size={"lg"}
            px={6}
            _hover={{
              bg: "green.500",
            }}
          >
            Get Started
          </Button>
        </VStack>
      </VStack>
    </Container>
  );
}
