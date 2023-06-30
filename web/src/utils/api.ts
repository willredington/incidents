import axios, { type AxiosRequestConfig } from "axios";

export type FetcherProps = {
  path: string;
  requestConfig: Pick<AxiosRequestConfig, "method" | "data" | "params">;
};

export async function fetcher<T>({ path, requestConfig }: FetcherProps) {
  const result = await axios<T>({
    ...requestConfig,
    url: `${import.meta.env.VITE_API_ROOT}/${path}`,
  });

  return result.data;
}
