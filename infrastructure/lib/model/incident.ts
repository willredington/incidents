import { z } from "zod";

// NOTE: 99% of this was chat gpt, I just gave it the JSON
const statusInfoSchema = z.object({
  geohash: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  timestamp: z.string(),
});

const extendedDataSchema = z.object({
  dispatch_duration: z.number(),
  event_duration: z.number(),
  response_time: z.number(),
});

const unitStatusSchema = z.object({
  acknowledged: statusInfoSchema.optional(),
  arrived: statusInfoSchema.optional(),
  available: statusInfoSchema.optional(),
  cleared: statusInfoSchema.optional(),
  dispatched: statusInfoSchema.optional(),
  enroute: statusInfoSchema.optional(),
  "~": statusInfoSchema.optional(),
});

const apparatusSchema = z.object({
  car_id: z.string(),
  extended_data: extendedDataSchema,
  geohash: z.string(),
  personnel: z.array(z.unknown()).optional(),
  shift: z.string(),
  station: z.string(),
  unit_id: z.string(),
  unit_status: unitStatusSchema,
  unit_type: z.string(),
});

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
  postal_code: z.string().optional(),
  prefix_direction: z.string(),
  response_zone: z.string(),
  state: z.string(),
  suffix_direction: z.string(),
  type: z.string(),
});

const descriptionSchema = z.object({
  comments: z.string(),
  day_of_week: z.string(),
  event_closed: z.string(),
  event_id: z.string(),
  event_opened: z.string(),
  extended_data: extendedDataSchema,
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
  address: addressSchema,
  apparatus: z.array(apparatusSchema),
  description: descriptionSchema,
  fire_department: fireDepartmentSchema,
  version: z.string(),
});

export type IncidentSchema = z.infer<typeof IncidentSchema>;
