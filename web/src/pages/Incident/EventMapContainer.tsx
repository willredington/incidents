import { Box, HStack, Select } from "@chakra-ui/react";
import { uniq } from "lodash";
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Apparatus, IncidentData } from "../../models/incident";
import { EventMap } from "./EventMap";
import { MapLegend } from "./MapLegend";

export function EventMapContainer({ incident }: { incident: IncidentData }) {
  const [selectedUnit, setSelectedUnit] = useState<Apparatus | null>(
    incident.apparatus?.[0] ?? null
  );

  useEffect(() => {
    setSelectedUnit(incident.apparatus?.[0] ?? null);
  }, [incident.apparatus]);

  const distinctUnitTypes = useMemo(
    () => uniq(incident.apparatus.map((item) => item.unit_type)),
    [incident.apparatus]
  );

  const handleUnitChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (event) => {
      const targetUnit = incident.apparatus.find(
        (item) => item.unit_id === event.currentTarget.value
      );

      if (targetUnit) {
        setSelectedUnit(targetUnit);
      }
    },
    [incident.apparatus]
  );

  return (
    <>
      <HStack justify={"space-between"}>
        <MapLegend unitTypes={distinctUnitTypes} />
        <HStack>
          <Box>
            <Select
              placeholder="Selected unit"
              value={selectedUnit?.unit_id}
              onChange={handleUnitChange}
            >
              {incident.apparatus.map((unit) => (
                <option key={unit.car_id} value={unit.unit_id}>
                  Unit - {unit.unit_type} {unit.car_id}
                </option>
              ))}
            </Select>
          </Box>
        </HStack>
      </HStack>
      <EventMap incident={incident} selectedUnit={selectedUnit} />
    </>
  );
}
