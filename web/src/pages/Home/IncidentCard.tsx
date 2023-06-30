import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Heading,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IncidentData } from "../../models/incident";
import { formatDateTime } from "../../utils/date";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { IncidentHeader } from "../../components/IncidentHeader";

export function IncidentCard({ incident }: { incident: IncidentData }) {
  const navigate = useNavigate();

  const onViewDetails = useCallback(() => {
    navigate(`/incident/${incident.id}`);
  }, [navigate, incident.id]);

  return (
    <Card>
      <CardHeader>
        <IncidentHeader incident={incident} />
      </CardHeader>
      <CardBody>
        <Text>{incident.fire_department.state}</Text>
        <Text>{incident.fire_department.name}</Text>
      </CardBody>
      <CardFooter>
        <Button colorScheme="blue" onClick={onViewDetails}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
