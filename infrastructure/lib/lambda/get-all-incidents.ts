import { APIGatewayProxyHandler } from "aws-lambda";
import { RunTimeEnvVariable, getEnvVariable } from "../config";
import { IncidentService } from "../service/incident";
import { DEFAULT_JSON_HTTP_HEADERS, DEFAULT_TEXT_HTTP_HEADERS } from "../utils";

export const handler: APIGatewayProxyHandler = async (proxyEvent) => {
  const incidentService = new IncidentService(
    getEnvVariable(RunTimeEnvVariable.INCIDENT_TABLE_NAME)
  );

  try {
    const incidentResult = await incidentService.getAllIncidents();

    return {
      statusCode: 200,
      headers: DEFAULT_JSON_HTTP_HEADERS,
      body: JSON.stringify(incidentResult.unwrap()),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: DEFAULT_TEXT_HTTP_HEADERS,
      body: "Something went wrong",
    };
  }
};

export default handler;
