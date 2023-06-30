import { IncidentSchema } from "../model";
import { DbClient } from "./db";

export class IncidentService {
  private readonly client: DbClient<IncidentSchema>;

  constructor(incidentTableName: string) {
    this.client = new DbClient<IncidentSchema>(
      IncidentSchema,
      incidentTableName
    );
  }

  getIncident({ id }: { id: string }) {
    return this.client.getItem({
      id,
    });
  }

  getAllIncidents() {
    return this.client.scanItems();
  }
}
