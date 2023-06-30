import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { IncidentData } from "../../models/incident";
import { formatDateTime } from "../../utils/date";

export function IncidentCard({ incident }: { incident: IncidentData }) {
  return (
    <Card size={"lg"}>
      <CardHeader>
        <HStack justify={"space-between"}>
          <Text fontWeight={"semibold"} fontSize={"2xl"}>
            Incident
          </Text>
          <Text>#{incident.description.incident_number}</Text>
        </HStack>
      </CardHeader>
      <CardBody>
        <p>incident data goes here</p>
      </CardBody>
    </Card>
  );
}
