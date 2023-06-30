import { z } from "zod";

const addressSchema = z.object({
  address_id: z.string(),
  address_line1: z.string(),
  city: z.string(),
  common_place_name: z.string(),
  cross_street1: z.string(),
  cross_street2: z.string(),
  first_due: z.string(),
  geohash: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  name: z.string(),
  number: z.string(),
  postal_code: z.string(),
  prefix_direction: z.string(),
  response_zone: z.string(),
  state: z.string(),
  suffix_direction: z.string(),
  type: z.string(),
});

const unitStatusSchema = z.record(
  z.object({
    geohash: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    timestamp: z.string(),
  })
);

const apparatusSchema = z.object({
  car_id: z.string(),
  distance: z.number().optional(), // Make 'distance' an optional field
  extended_data: z.object({
    event_duration: z.number(),
    response_duration: z.number(),
    travel_duration: z.number(),
    turnout_duration: z.number(),
  }),
  geohash: z.string(),
  personnel: z.array(z.unknown()),
  shift: z.string(),
  station: z.string(),
  unit_id: z.string(),
  unit_status: unitStatusSchema,
  unit_type: z.string(),
});

const descriptionSchema = z.object({
  comments: z.string(),
  day_of_week: z.string(),
  event_closed: z.string(),
  event_id: z.string(),
  event_opened: z.string(),
  extended_data: z.object({
    dispatch_duration: z.number(),
    event_duration: z.number(),
    response_time: z.number(),
  }),
  first_unit_arrived: z.string(),
  first_unit_dispatched: z.string(),
  first_unit_enroute: z.string(),
  hour_of_day: z.number(),
  incident_number: z.string(),
  loi_search_complete: z.string(),
  subtype: z.string(),
  type: z.string(),
});

const fireDepartmentSchema = z.object({
  fd_id: z.string(),
  firecares_id: z.string(),
  name: z.string(),
  shift: z.string(),
  state: z.string(),
  timezone: z.string(),
});

export const IncidentSchema = z.object({
  id: z.string(),
  address: addressSchema,
  apparatus: z.array(apparatusSchema),
  description: descriptionSchema,
  fire_department: fireDepartmentSchema,
  version: z.string(),
});

export type IncidentSchema = z.infer<typeof IncidentSchema>;
