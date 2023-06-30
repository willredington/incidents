import { useToast } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../../components/Layout";

type PageParams = {
  incidentId: string;
};

export function Incident() {
  const { incidentId: projectId } = useParams<PageParams>();

  const toast = useToast();

  const navigate = useNavigate();

  return (
    <Layout>
      <p>incident goes here</p>
    </Layout>
  );
}
