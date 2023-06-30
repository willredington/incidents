import { useAuth0 } from "@auth0/auth0-react";
import { AddIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  HStack,
  Heading,
  IconButton,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getProjects } from "../../services/project";
import { NewProjectModal } from "./NewProjectModal";
import { ProjectListItem } from "./ProjectListItem";

export function ProjectList() {
  const { getAccessTokenSilently } = useAuth0();

  const { onOpen, isOpen, onClose } = useDisclosure();

  const {
    refetch,
    isFetched,
    isLoading,
    data: projects = [],
  } = useQuery(
    "getProjects",
    () =>
      getProjects({
        getJwtToken: getAccessTokenSilently,
      }),
    {
      refetchInterval: 5000,
    }
  );

  const hasNoProjects = projects.length === 0 && isFetched;

  return (
    <>
      <VStack
        border={"1px solid"}
        borderColor={useColorModeValue("gray.400", "gray.600")}
        borderRadius={"md"}
        align={"flex-start"}
        spacing={4}
        p={8}
        w="full"
      >
        <HStack justify={"space-between"} w={"full"}>
          <HStack spacing={4}>
            <Heading textAlign={"left"} size={"lg"}>
              My Projects
            </Heading>
            <IconButton
              onClick={onOpen}
              icon={<AddIcon />}
              aria-label="add project"
            />
            <IconButton
              icon={<RepeatIcon />}
              aria-label="refresh-btn"
              onClick={() => void refetch()}
            />
          </HStack>
          {isLoading && <Spinner />}
        </HStack>
        {hasNoProjects && (
          <Text fontSize={"2xl"}>Project will appear here, nothing yet...</Text>
        )}
        <SimpleGrid w="full" columns={3} spacing={4} minH={"300px"}>
          {projects.map((project) => (
            <ProjectListItem key={project.id} project={project} />
          ))}
        </SimpleGrid>
      </VStack>
      <NewProjectModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
