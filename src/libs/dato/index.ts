export interface NextOptionType {
  dynamic?: "auto" | "force-dynamic" | "error" | "force-static";
  dynamicParams?: boolean;
  revalidate?: false | number;
  fetchCache?:
    | "auto"
    | "default-cache"
    | "only-cache"
    | "force-cache"
    | "force-no-store"
    | "default-no-store"
    | "only-no-store";
  runtime?: "edge" | "nodejs";
  preferredRegion?: "auto" | "global" | "home" | ["iad1", "sfo1"];
  maxDuration?: number;
}
interface DatoParameterType {
  query: string;
  variables?: { [key: string]: any };
  includeDrafts?: boolean;
  next?: NextOptionType;
}
export const performRequest = async ({
  query,
  variables = {},
  includeDrafts = false,
  next = {},
}: DatoParameterType) => {
  const response = await fetch("https://graphql.datocms.com/", {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
      ...(includeDrafts ? { "X-Include-Drafts": "true" } : {}),
    },
    method: "POST",
    body: JSON.stringify({ query, variables }),
    next,
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText}: ${JSON.stringify(
        responseBody
      )}`
    );
  }

  return responseBody;
};
