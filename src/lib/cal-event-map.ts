import type { WeddingServiceType } from "./pricing/wedding";
import { weddingVehicles } from "./pricing/wedding";
import { tourOptions } from "./pricing/tour";
import { oneWayCarOptions } from "./pricing/one-way-cars";

export type CalEventKind = "wedding" | "tour" | "one-way";

interface BaseCalEventConfig {
  slug: string;
  kind: CalEventKind;
  stripeDescription: string;
  successPath: string;
  cancelPath: string;
  defaultDeposit?: number;
  metadata: Record<string, string>;
}

export interface WeddingCalEventConfig extends BaseCalEventConfig {
  kind: "wedding";
  serviceType: WeddingServiceType;
  vehicleId: string;
}

export interface TourCalEventConfig extends BaseCalEventConfig {
  kind: "tour";
  tourId: string;
}

export interface OneWayCalEventConfig extends BaseCalEventConfig {
  kind: "one-way";
  vehicleId: string;
}

export type CalEventConfig =
  | WeddingCalEventConfig
  | TourCalEventConfig
  | OneWayCalEventConfig;

const baseSuccessPath = "/booking/payment-success";

const calEventEntries: CalEventConfig[] = [
  ...weddingVehicles.map<WeddingCalEventConfig>((vehicle) => {
    const slug = `wedding-${vehicle.category}-${vehicle.id}`;
    return {
      slug,
      kind: "wedding",
      serviceType: vehicle.category,
      vehicleId: vehicle.id,
      stripeDescription: `${vehicle.name} – ${
        vehicle.category === "main" ? "Main Fleet" : "Guest Transport"
      }`,
      successPath: `${baseSuccessPath}?type=wedding&vehicle=${vehicle.id}`,
      cancelPath: "/booking/payment-cancel?type=wedding",
      defaultDeposit: undefined,
      metadata: {
        vehicleName: vehicle.name,
        serviceType: vehicle.category,
      },
    };
  }),
  ...tourOptions.map<TourCalEventConfig>((tour) => {
    const slug = `tour-${tour.id}`;
    return {
      slug,
      kind: "tour",
      tourId: tour.id,
      stripeDescription: `${tour.name} – ${tour.location}`,
      successPath: `${baseSuccessPath}?type=tour&tourId=${tour.id}`,
      cancelPath: "/booking/payment-cancel?type=tour",
      defaultDeposit: undefined,
      metadata: {
        tourName: tour.name,
        destination: tour.location,
      },
    };
  }),
  ...oneWayCarOptions.map<OneWayCalEventConfig>((vehicle) => {
    const slug = `one-way-${vehicle.id}`;
    return {
      slug,
      kind: "one-way",
      vehicleId: vehicle.id,
      stripeDescription: `${vehicle.name} – One-way transfer`,
      successPath: `${baseSuccessPath}?type=one-way&vehicle=${vehicle.id}`,
      cancelPath: "/booking/payment-cancel?type=one-way",
      defaultDeposit: undefined,
      metadata: {
        vehicleName: vehicle.name,
        category: vehicle.category,
      },
    };
  }),
];

export const calEventMap = calEventEntries.reduce<Record<string, CalEventConfig>>(
  (acc, config) => {
    acc[config.slug] = config;
    return acc;
  },
  {},
);

export function getCalEventConfig(slug: string): CalEventConfig | undefined {
  return calEventMap[slug];
}
