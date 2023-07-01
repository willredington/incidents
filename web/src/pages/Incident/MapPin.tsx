import { Text, VStack } from "@chakra-ui/react";
import { useMemo } from "react";
import { MdEmergency as EmergencyIcon } from "react-icons/md";
import { getIcon } from "./Icons";

export function EmergencyMapPin() {
  return (
    <VStack align="center" cursor="pointer">
      <EmergencyIcon size="3em" />
    </VStack>
  );
}

export function UnitMapPin({
  name,
  unitType,
}: {
  name: string;
  unitType: string;
}) {
  const Icon = useMemo(() => getIcon(unitType), [unitType]);
  return (
    <VStack align="center" cursor="pointer">
      <Text fontSize="2xl" fontWeight="semibold">
        {name}
      </Text>
      <Icon size="3em" />
    </VStack>
  );
}
