import { Gif } from "../models/gif";
import { FetcherProps, fetcher } from "../utils/api";

export function searchGifs({
  limit,
  offset,
  searchTerm,
  getJwtToken,
}: Pick<FetcherProps, "getJwtToken"> & {
  limit: number;
  offset: number;
  searchTerm: string;
}) {
  return fetcher<Gif[]>({
    getJwtToken,
    path: "gif",
    requestConfig: {
      method: "GET",
      params: {
        limit,
        offset,
        searchTerm,
      },
    },
  });
}
