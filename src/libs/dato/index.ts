/* eslint-disable @typescript-eslint/no-explicit-any */
import { REVALIDATE_TIME } from "@/utils/constant";

interface DatoParameterType {
  query: string;
  variables?: { [key: string]: any };
  includeDrafts?: boolean;
  excludeInvalid?: boolean;
  visualEditingBaseUrl?: string;
  revalidate?: NextFetchRequestConfig["revalidate"];
}
export const performRequest = async <T>({
  query,
  variables = {},
  includeDrafts = false,
  excludeInvalid = false,
  visualEditingBaseUrl,
  revalidate = REVALIDATE_TIME,
}: DatoParameterType): Promise<{ data: T }> => {
  try {
    const response = await fetch("https://graphql.datocms.com/", {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
        ...(includeDrafts ? { "X-Include-Drafts": "true" } : {}),
        ...(excludeInvalid ? { "X-Exclude-Invalid": "true" } : {}),
        ...(visualEditingBaseUrl
          ? {
              "X-Visual-Editing": "vercel-v1",
              "X-Base-Editing-Url": visualEditingBaseUrl,
            }
          : {}),
      },
      method: "POST",
      body: JSON.stringify({ query, variables }),
      next: { revalidate },
    });

    const responseBody = await (response.json() as Promise<{ data: T }>);

    if (!response.ok) {
      throw new Error(
        `${response.status} ${response.statusText}: ${JSON.stringify(
          responseBody,
        )}`,
      );
    }

    return responseBody;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
