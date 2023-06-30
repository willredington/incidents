import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { z } from "zod";
import { getGIFs } from "../service/gif";
import { DEFAULT_JSON_HTTP_HEADERS, DEFAULT_TEXT_HTTP_HEADERS } from "../utils";

const ExpectedQueryParameters = z.object({
  searchTerm: z.string(),
  limit: z.string().transform((val) => parseInt(val)),
  offset: z.string().transform((val) => parseInt(val)),
});

export const handler: APIGatewayProxyHandler = async (
  proxyEvent: APIGatewayProxyEvent
) => {
  const eventResult = ExpectedQueryParameters.safeParse(
    proxyEvent.queryStringParameters
  );

  if (!eventResult.success) {
    return {
      statusCode: 400,
      headers: DEFAULT_TEXT_HTTP_HEADERS,
      body: "Invalid query parameters",
    };
  }

  const { limit, offset, searchTerm } = eventResult.data;

  try {
    const gifResult = await getGIFs({
      limit,
      offset,
      searchTerm,
    });

    return {
      statusCode: 200,
      headers: DEFAULT_JSON_HTTP_HEADERS,
      body: JSON.stringify(gifResult.data),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: DEFAULT_TEXT_HTTP_HEADERS,
      body: "An unknown error occurred",
    };
  }
};

export default handler;
