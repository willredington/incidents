import { Handler } from "aws-lambda";
import * as AWS from "aws-sdk";
import axios from "axios";
import { RunTimeEnvVariable, getEnvVariable } from "../config";
import { ProjectSection } from "../model";
import { getGIFs } from "../service/gif";

const s3 = new AWS.S3();

export const handler: Handler = async (incomingEvent): Promise<string> => {
  console.log(incomingEvent);

  const section = ProjectSection.parse(incomingEvent);

  let gifUrl = section.gifUrl;

  if (!gifUrl) {
    const gifResult = await getGIFs({
      searchTerm: section.gifHint,
      limit: 1,
      offset: 0,
    });

    console.log("GIF RESULT", gifResult.data);

    if (gifResult.data.length) {
      gifUrl = gifResult.data[0].images.downsized.url;
    } else {
      throw new Error(`could not find GIF for hint: ${section.gifHint}`);
    }
  }

  const gifStreamResult = await axios.get<ReadableStream>(gifUrl, {
    responseType: "stream",
  });

  const bucketResult = await s3
    .upload({
      Bucket: getEnvVariable(RunTimeEnvVariable.GIF_BUCKET_NAME),
      Key: `${section.id}.gif`,
      ContentType: "image/gif",
      Body: gifStreamResult.data,
    })
    .promise();

  return bucketResult.Location;
};

export default handler;
