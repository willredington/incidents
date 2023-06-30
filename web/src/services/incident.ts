import { IncidentSchema } from "../models/incident";
import { fetcher } from "../utils/api";

export function getIncident({ incidentId }: { incidentId: string }) {
  return fetcher<IncidentSchema>({
    path: `incident/${incidentId}`,
    requestConfig: {
      method: "GET",
    },
  });
}
