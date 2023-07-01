import { v4 as uuid } from "uuid";
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

  createIncident({ incident }: { incident: Omit<IncidentSchema, "id"> }) {
    return this.client.putItem({
      id: uuid(),
      ...incident,
    });
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
