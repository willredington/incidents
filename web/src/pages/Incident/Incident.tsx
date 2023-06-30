import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Spinner,
  Tag,
  VStack,
  Text,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { getIncident } from "../../services/incident";
import { formatDateTime } from "../../utils/date";
import { IncidentHeader } from "../../components/IncidentHeader";
import { ViewIcon } from "@chakra-ui/icons";
import { ExpandableText } from "../../components/ExpandText";

type PageParams = {
  incidentId: string;
};

export function Incident() {
  const { incidentId } = useParams<PageParams>();

  const navigate = useNavigate();

  const { isLoading, data: incident } = useQuery(
    "getIncident",
    () =>
      incidentId
        ? getIncident({
            incidentId,
          })
        : null,
    {
      enabled: !!incidentId,
    }
  );

  const goBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  if (isLoading) {
    return (
      <Layout>
        <Spinner size={"lg"} />
      </Layout>
    );
  }

  if (incident) {
    return (
      <Layout>
        <Card>
          <CardHeader>
            <IncidentHeader incident={incident} />
          </CardHeader>
          <CardBody>
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
                <ExpandableText fontSize={"sm"} noOfLines={4}>
                  {incident.description.comments}
                </ExpandableText>
              </VStack>
            </VStack>
          </CardBody>
        </Card>
      </Layout>
    );
  }

  return null;
}
