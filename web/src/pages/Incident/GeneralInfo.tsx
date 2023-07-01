import { VStack, Text } from "@chakra-ui/react";
import { ExpandableText } from "../../components/ExpandText";
import { IncidentData } from "../../models/incident";

export function GeneralInfo({ incident }: { incident: IncidentData }) {
  return (
    <VStack alignItems={"flex-start"}>
      <VStack alignItems={"flex-start"}>
        <Text fontSize={"lg"} fontWeight={"semibold"}>
          Fire Department
        </Text>
        <Text>{incident.fire_department.name}</Text>
      </VStack>
      <VStack alignItems={"flex-start"}>
        <Text fontSize={"lg"} fontWeight={"semibold"}>
          Comments
        </Text>
        <ExpandableText fontSize={"sm"} noOfLines={2}>
          {incident.description.comments}
        </ExpandableText>
      </VStack>
    </VStack>
  );
}
