import { HStack, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useMemo } from "react";
import { IncidentData } from "../../models/incident";
import { formatDateTime } from "../../utils/date";

export function IncidentStats({ incident }: { incident: IncidentData }) {
  const eventDurationValue = useMemo(() => {
    const startDt = DateTime.fromISO(incident.description.event_opened);
    const endDt = DateTime.fromISO(incident.description.event_closed);
    const diff = endDt.diff(startDt, ["hours", "minutes"]);
    const hours = Math.floor(diff.hours);
    const minutes = Math.floor(diff.minutes);
    return `${hours} hours and ${minutes} minutes`;
  }, [incident.description]);

  return (
    <HStack justify={"space-between"}>
      <Stat>
        <StatLabel>Incident Duration</StatLabel>
        <StatNumber>{eventDurationValue}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Incident Start</StatLabel>
        <StatNumber>
          {formatDateTime(incident.description.event_opened)}
        </StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Incident End</StatLabel>
        <StatNumber>
          {formatDateTime(incident.description.event_closed)}
        </StatNumber>
      </Stat>
    </HStack>
  );
}
