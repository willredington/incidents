import { APIGatewayProxyHandler } from "aws-lambda";
import { z } from "zod";
import { RunTimeEnvVariable, getEnvVariable } from "../config";
import { IncidentService } from "../service/incident";
import { DEFAULT_JSON_HTTP_HEADERS, DEFAULT_TEXT_HTTP_HEADERS } from "../utils";

const ExpectRequestPathParameters = z.object({
  incidentId: z.string().nonempty(),
});

export const handler: APIGatewayProxyHandler = async (proxyEvent) => {
  const pathParametersResult = ExpectRequestPathParameters.safeParse(
    proxyEvent.pathParameters
  );

  if (!pathParametersResult.success) {
    return {
      statusCode: 400,
      headers: DEFAULT_TEXT_HTTP_HEADERS,
      body: "Invalid request",
    };
  }

  const { incidentId } = pathParametersResult.data;

  const incidentService = new IncidentService(
    getEnvVariable(RunTimeEnvVariable.INCIDENT_TABLE_NAME)
  );

  try {
    const incidentResult = await incidentService.getIncident({
      id: incidentId,
    });

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
