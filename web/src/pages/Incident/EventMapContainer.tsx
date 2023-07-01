import { useState } from "react";
import {
  Apparatus,
  IncidentData,
  UnitStatusType,
  unitStatusTypeOrder,
} from "../../models/incident";
import { EventMap } from "./EventMap";

export function EventMapContainer({ incident }: { incident: IncidentData }) {
  const [selectedStatus, setSelectedStatus] = useState<UnitStatusType>(
    unitStatusTypeOrder[0]
  );

  const [selectedUnit, setSelectedUnit] = useState<Apparatus | null>(
    incident.apparatus?.[0] ?? null
  );

  return (
    <>
      <EventMap
        incident={incident}
        selectedStatus={selectedStatus}
        selectedUnit={selectedUnit}
      />
    </>
  );
}
