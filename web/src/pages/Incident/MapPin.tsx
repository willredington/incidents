import { Text, VStack } from "@chakra-ui/react";
import { FaRadiationAlt as RadiationIcon } from "react-icons/fa";
import { MdEmergency as EmergencyIcon } from "react-icons/md";

export function EmergencyMapPin() {
  return (
    <VStack align="center" cursor="pointer">
      <EmergencyIcon size="3em" />
    </VStack>
  );
}

export function HazmatMapPin({ name }: { name: string }) {
  return (
    <VStack align="center" cursor="pointer">
      <Text fontSize="2xl" fontWeight="semibold">
        {name}
      </Text>
      <RadiationIcon size="3em" />
    </VStack>
  );
}
