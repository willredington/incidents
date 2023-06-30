import { IncidentData } from "../models/incident";
import { fetcher } from "../utils/api";

export function getIncident({ incidentId }: { incidentId: string }) {
  return fetcher<IncidentData>({
    path: `incident/${incidentId}`,
    requestConfig: {
      method: "GET",
    },
  });
}

export function getIncidents() {
  return fetcher<IncidentData[]>({
    path: "incidents",
    requestConfig: {
      method: "GET",
    },
  });
}
