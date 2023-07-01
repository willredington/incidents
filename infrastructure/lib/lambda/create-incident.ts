import { APIGatewayProxyHandler } from "aws-lambda";
import { DEFAULT_JSON_HTTP_HEADERS, DEFAULT_TEXT_HTTP_HEADERS } from "../utils";
import parser from "lambda-multipart-parser";
import { IncidentSchema } from "../model";
import { IncidentService } from "../service/incident";
import { RunTimeEnvVariable, getEnvVariable } from "../config";

export const handler: APIGatewayProxyHandler = async (proxyEvent) => {
  try {
    console.log(proxyEvent);
    const parsed = await parser.parse(proxyEvent);

    const parsedFile = parsed.files?.[0];

    if (!parsedFile) {
      return {
        statusCode: 400,
        headers: DEFAULT_TEXT_HTTP_HEADERS,
        body: "Bad request, file not correctly uploaded",
      };
    }

    const jsonString = parsedFile.content.toString("utf-8");

    const incidentResult = IncidentSchema.omit({
      id: true,
    }).safeParse(JSON.parse(jsonString ?? ""));

    if (!incidentResult.success) {
      console.error(incidentResult.error);
      return {
        statusCode: 400,
        headers: DEFAULT_TEXT_HTTP_HEADERS,
        body: "Bad request, file does not match schema",
      };
    }

    const incidentService = new IncidentService(
      getEnvVariable(RunTimeEnvVariable.INCIDENT_TABLE_NAME)
    );

    const newIncident = await incidentService.createIncident({
      incident: incidentResult.data,
    });

    return {
      statusCode: 200,
      headers: DEFAULT_JSON_HTTP_HEADERS,
      body: JSON.stringify(newIncident),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: DEFAULT_TEXT_HTTP_HEADERS,
      body: "Something went wrong",
    };
  }
};

export default handler;
