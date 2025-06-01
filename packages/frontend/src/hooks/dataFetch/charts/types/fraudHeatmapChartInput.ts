import { z } from 'zod/v4';

export const FraudHeatmapChartInput = z.object({
  columns: z.array(z.string()),
  data: z.array(z.tuple([z.string(), z.number().min(0).max(100)])),
});

export type FraudHeatmapChartInputType = z.infer<typeof FraudHeatmapChartInput>;
