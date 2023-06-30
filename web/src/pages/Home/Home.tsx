import { VStack } from "@chakra-ui/react";
import { Layout } from "../../components/Layout";
import { Incidents } from "./Incidents";

export function Home() {
  return (
    <Layout>
      <Incidents />
    </Layout>
  );
}
