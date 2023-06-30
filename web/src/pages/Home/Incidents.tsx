import { Heading, SimpleGrid, Spinner, VStack } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getIncidents } from "../../services/incident";
import { IncidentCard } from "./IncidentCard";

export function Incidents() {
  const { isLoading, data: incidents } = useQuery("getIncidents", getIncidents);

  console.log(incidents);

  if (isLoading) {
    return <Spinner size={"xl"} />;
  }

  return (
    <VStack spacing={4} w="full">
      <Heading alignSelf={"flex-start"}>Incidents</Heading>
      <SimpleGrid columns={2} spacing={8} w="full">
        {incidents?.map((incident) => (
          <IncidentCard key={incident.id} incident={incident} />
        ))}
      </SimpleGrid>
    </VStack>
  );
}
