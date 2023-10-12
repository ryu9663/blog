export interface NextSegmentType {
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
