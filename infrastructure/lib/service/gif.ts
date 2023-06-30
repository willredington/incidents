import axios from "axios";
import { z } from "zod";
import { SecretName, getSecretValueFromEnv } from "../service/secret";

export const Gif = z.object({
  url: z.string(),
});

export type Gif = z.infer<typeof Gif>;

export const GifResponse = z.object({
  pagination: z.object({
    total_count: z.number(),
    count: z.number(),
    offset: z.number(),
  }),
  data: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      images: z.object({
        original: Gif,
        downsized: Gif,
      }),
    })
  ),
});

export async function getGIFs({
  limit,
  offset,
  searchTerm,
}: {
  limit: number;
  offset: number;
  searchTerm: string;
}) {
  try {
    const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
      params: {
        limit,
        offset,
        q: searchTerm,
        api_key: getSecretValueFromEnv(SecretName.GIFY_API_KEY),
      },
    });

    return GifResponse.parse(response.data);
  } catch (err) {
    console.log(err);
    console.error(`failed to get GIF for search term: ${searchTerm}`);
    throw err;
  }
}
