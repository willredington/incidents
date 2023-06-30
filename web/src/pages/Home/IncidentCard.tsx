import {
  Box,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IncidentData } from "../../models/incident";
import { formatDateTime } from "../../utils/date";

export function IncidentCard({ incident }: { incident: IncidentData }) {
  return (
    <Card size={"lg"}>
      <CardHeader>
        <VStack spacing={4} alignItems={"stretch"}>
          <HStack justify={"space-between"} alignItems={"baseline"}>
            <HStack alignItems={"baseline"}>
              <Text fontWeight={"semibold"} fontSize={"2xl"}>
                Incident
              </Text>
              <Text>#{incident.description.incident_number}</Text>
            </HStack>
            <Tag alignSelf={"flex-start"}>{incident.description.type}</Tag>
          </HStack>
          <HStack justify={"space-between"}>
            <VStack align={"flex-start"}>
              <Text fontWeight={"semibold"}>Opened</Text>
              <Text fontSize={"sm"} fontStyle={"italic"}>
                {formatDateTime(incident.description.event_opened)}
              </Text>
            </VStack>
            <VStack align={"flex-start"}>
              <Text fontWeight={"semibold"}>Closed</Text>
              <Text fontSize={"sm"} fontStyle={"italic"}>
                {formatDateTime(incident.description.event_closed)}
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </CardHeader>
      <CardBody>
        <p>incident data goes here</p>
      </CardBody>
    </Card>
  );
}
