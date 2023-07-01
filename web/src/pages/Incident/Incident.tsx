import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { IncidentHeader } from "../../components/IncidentHeader";
import { Layout } from "../../components/Layout";
import { getIncident } from "../../services/incident";
import { EventMapContainer } from "./EventMapContainer";
import { GeneralInfo } from "./GeneralInfo";

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
        <Card w={"full"} mb={8}>
          <CardHeader>
            <IncidentHeader incident={incident} />
          </CardHeader>
          <CardBody>
            <EventMapContainer incident={incident} />
            <GeneralInfo incident={incident} />
          </CardBody>
          <CardFooter>
            <Button onClick={goBack}>Go Back</Button>
          </CardFooter>
        </Card>
      </Layout>
    );
  }

  return null;
}
