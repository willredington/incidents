import { HStack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { MdEmergency as EmergencyIcon } from "react-icons/md";
import { UnitType, UnitTypeDescriptions } from "../../models/incident";
import { getIcon } from "./Icons";

function LegendItem({ label, icon }: { label: string; icon: ReactNode }) {
  return (
    <HStack>
      {icon}
      <Text>{label}</Text>
    </HStack>
  );
}

export function MapLegend({ unitTypes }: { unitTypes: UnitType[] }) {
  return (
    <HStack spacing={4}>
      <LegendItem label="Emergency" icon={<EmergencyIcon />} />
      {Object.values(UnitType)
        .filter((unitType) => unitTypes.includes(unitType))
        .map((unitType) => {
          const Icon = getIcon(unitType);
          return (
            <LegendItem
              key={unitType}
              label={UnitTypeDescriptions[unitType]}
              icon={<Icon />}
            />
          );
        })}
    </HStack>
  );
}
