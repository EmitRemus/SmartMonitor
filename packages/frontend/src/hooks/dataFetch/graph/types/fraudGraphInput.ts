import { z } from 'zod/v4';

const FraudGraphMeter = z.object({
  name: z.string(),
  attributes: z.object({
    name: z.string(),
    consumption: z.number().nonnegative(),
    lastReading: z.string().refine(
      (val) => {
        const date = new Date(val);
        if (isNaN(date.getTime())) return false;
        if (date.toISOString() !== val) return false;
        return true;
      },
      {
        abort: true,
        error: 'lastReading should be in ISO Date string format',
      },
    ),
    type: z.string(),
    id: z.string(),
    totalHotWater: z.number().nonnegative(),
    totalColdWater: z.number().nonnegative(),
    fraudFactor: z.number().min(0).max(100),
  }),
});

const FraudGraphApartment = z.object({
  name: z.string(),
  attributes: z.object({
    name: z.string(),
    type: z.string(),
    id: z.string(),
    totalHotWater: z.number().nonnegative(),
    totalColdWater: z.number().nonnegative(),
    fraudFactor: z.number().min(0).max(100),
  }),
  children: z.array(FraudGraphMeter),
});

const FraudGraphBuilding = z.object({
  name: z.string(),
  attributes: z.object({
    name: z.string(),
    type: z.string(),
    id: z.string(),
    totalHotWater: z.number().nonnegative(),
    totalColdWater: z.number().nonnegative(),
  }),
  children: z.array(FraudGraphApartment),
});

const FraudGraphPumpStation = z.object({
  name: z.string(),
  attributes: z.object({
    name: z.string(),
    type: z.string(),
    id: z.string(),
    totalHotWater: z.number().nonnegative(),
    totalColdWater: z.number().nonnegative(),
  }),
  children: z.array(FraudGraphBuilding),
});

export const FraudGraphInput = z.object({
  name: z.string(),
  attributes: z.object({
    name: z.string(),
    type: z.string(),
  }),
  children: z.array(FraudGraphPumpStation),
});

export type FraudGraphInputType = z.infer<typeof FraudGraphInput>;
