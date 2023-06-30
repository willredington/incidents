import { useQuery } from "react-query";
import { getIncidents } from "../../services/incident";

export function Incidents() {
  const incidentsQuery = useQuery("getIncidents", getIncidents);

  return (
    <div>
      <p>incidents go here</p>
    </div>
  );
}
