import { Box, useColorMode } from "@chakra-ui/react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMemo } from "react";
import Map, { Marker, ViewState } from "react-map-gl";
import {
  Apparatus,
  IncidentData,
  UnitStatusType,
  UnitStatusTypeMapDesc,
} from "../../models/incident";
import { EmergencyMapPin, UnitMapPin } from "./MapPin";

const MAP_STYLE = {
  light: "mapbox://styles/mapbox/streets-v9",
  dark: "mapbox://styles/mapbox/dark-v11",
};

const MAP_HEIGHT = "300px";

export function EventMap({
  incident,
  selectedUnit,
}: {
  incident: IncidentData;
  selectedUnit: Apparatus | null;
}) {
  const { colorMode } = useColorMode();

  const mapStyle = useMemo(() => MAP_STYLE[colorMode], [colorMode]);

  const emergencyPin = useMemo(() => {
    return (
      <Marker
        longitude={incident.address.longitude}
        latitude={incident.address.latitude}
        anchor="bottom"
      >
        <EmergencyMapPin />
      </Marker>
    );
  }, [incident.address]);

  const unitPins = useMemo(() => {
    if (selectedUnit) {
      return Object.entries(selectedUnit.unit_status).map(
        ([status, details]) => {
          return (
            <Marker
              key={status}
              latitude={details.latitude}
              longitude={details.longitude}
              anchor="bottom"
            >
              <UnitMapPin
                unitType={selectedUnit.unit_type}
                name={UnitStatusTypeMapDesc[status as UnitStatusType]}
              />
            </Marker>
          );
        }
      );
    }
  }, [selectedUnit]);

  const initialViewState: Partial<ViewState> = useMemo(() => {
    return {
      longitude: incident.address.longitude,
      latitude: incident.address.latitude,
      bearing: 0,
      pitch: 60,
      zoom: 12,
    };
  }, [incident.address]);

  return (
    <Box h={MAP_HEIGHT} mt={2}>
      <Map
        mapStyle={mapStyle}
        initialViewState={initialViewState}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      >
        {emergencyPin}
        {unitPins && unitPins}
      </Map>
    </Box>
  );
}
