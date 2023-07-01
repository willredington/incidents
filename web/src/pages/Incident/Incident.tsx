import { Card, CardBody, CardHeader, Spinner } from "@chakra-ui/react";
import { useCallback } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { IncidentHeader } from "../../components/IncidentHeader";
import { Layout } from "../../components/Layout";
import { getIncident } from "../../services/incident";
import { EventMapContainer } from "./EventMapContainer";

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
        <Card w={"full"}>
          <CardHeader>
            <IncidentHeader incident={incident} />
          </CardHeader>
          <CardBody>
            <EventMapContainer incident={incident} />
          </CardBody>
        </Card>
      </Layout>
    );
  }

  return null;
}
