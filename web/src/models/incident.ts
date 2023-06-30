type Address = {
  address_id: string;
  address_line1: string;
  city: string;
  common_place_name: string;
  cross_street1: string;
  cross_street2: string;
  first_due: string;
  geohash: string;
  latitude: number;
  longitude: number;
  name: string;
  number: string;
  postal_code: string;
  prefix_direction: string;
  response_zone: string;
  state: string;
  suffix_direction: string;
  type: string;
};

export enum UnitStatusType {
  Arrived = "arrived",
  Available = "available",
  Cleared = "cleared",
  Dispatched = "dispatched",
  Enroute = "enroute",
  Unknown = "~",
}

// this may seem a bit tautological but it helps us map types to descriptions in case we just want to change the labels
export const unitStatusTypeMapDesc: Record<UnitStatusType, string> = {
  [UnitStatusType.Arrived]: "Arrived",
  [UnitStatusType.Available]: "Available",
  [UnitStatusType.Cleared]: "Cleared",
  [UnitStatusType.Dispatched]: "Dispatched",
  [UnitStatusType.Enroute]: "Enroute",
  [UnitStatusType.Unknown]: "Unknown",
};

type UnitStatus = Record<
  UnitStatusType,
  {
    geohash: string;
    latitude: number;
    longitude: number;
    timestamp: string;
  }
>;

export type Apparatus = {
  car_id: string;
  distance?: number;
  extended_data: {
    event_duration: number;
    response_duration: number;
    travel_duration: number;
    turnout_duration: number;
  };
  geohash: string;
  personnel: unknown[];
  shift: string;
  station: string;
  unit_id: string;
  unit_status: UnitStatus;
  unit_type: string;
};

type Description = {
  comments: string;
  day_of_week: string;
  event_closed: string;
  event_id: string;
  event_opened: string;
  extended_data: {
    dispatch_duration: number;
    event_duration: number;
    response_time: number;
  };
  first_unit_arrived: string;
  first_unit_dispatched: string;
  first_unit_enroute: string;
  hour_of_day: number;
  incident_number: string;
  loi_search_complete: string;
  subtype: string;
  type: string;
};

type FireDepartment = {
  fd_id: string;
  firecares_id: string;
  name: string;
  shift: string;
  state: string;
  timezone: string;
};

export type IncidentData = {
  id: string;
  address: Address;
  apparatus: Apparatus[];
  description: Description;
  fire_department: FireDepartment;
  version: string;
};
