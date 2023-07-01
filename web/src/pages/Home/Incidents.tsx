import {
  Button,
  HStack,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getIncidents } from "../../services/incident";
import { IncidentCard } from "./IncidentCard";
import { AddIcon } from "@chakra-ui/icons";
import { FileUploadModal } from "../../components/FileUploadModal";

export function Incidents() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isLoading, data: incidents } = useQuery("getIncidents", getIncidents);

  if (isLoading) {
    return <Spinner size={"xl"} />;
  }

  return (
    <>
      <VStack spacing={4} w="full">
        <HStack alignSelf={"flex-start"} justify={"space-between"} w={"full"}>
          <Heading>Incidents</Heading>
          <IconButton
            icon={<AddIcon />}
            aria-label="add-incident"
            onClick={onOpen}
          />
        </HStack>
        <SimpleGrid
          columns={{
            md: 2,
            lg: 3,
          }}
          spacing={8}
          w="full"
        >
          {incidents?.map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
        </SimpleGrid>
      </VStack>
      <FileUploadModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
