import { Text, VStack } from "@chakra-ui/react";
import { IncidentData } from "../../models/incident";
import { IncidentStats } from "./IncidentStats";

export function GeneralInfo({ incident }: { incident: IncidentData }) {
  return (
    <VStack alignItems={"stretch"} spacing={6}>
      <VStack alignItems={"flex-start"}>
        <Text fontSize={"lg"} fontWeight={"semibold"}>
          Fire Department
        </Text>
        <Text>{incident.fire_department.name}</Text>
      </VStack>
      <IncidentStats incident={incident} />
      <VStack alignItems={"flex-start"}>
        <Text fontSize={"lg"} fontWeight={"semibold"}>
          Comments
        </Text>
        <Text fontSize={"sm"} noOfLines={4}>
          {incident.description.comments}
        </Text>
      </VStack>
    </VStack>
  );
}
