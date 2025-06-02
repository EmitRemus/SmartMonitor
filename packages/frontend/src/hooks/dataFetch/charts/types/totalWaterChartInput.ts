import { z } from 'zod/v4';

export const TotalWaterChartInput = z.array(
  z.object({
    name: z.string(),
    data: z.array(
      z.tuple([
        z.string().transform((val, ctx) => {
          const date = new Date(val);
          if (isNaN(date.getTime())) {
            ctx.issues.push({
              code: 'invalid_format',
              input: val,
              format: 'date',
            });
            return z.NEVER;
          }
          if (date.toISOString() !== val) {
            ctx.issues.push({
              code: 'invalid_format',
              input: val,
              format: 'date',
            });
            return z.NEVER;
          }
          return date;
        }),
        z.number(),
      ]),
    ),
  }),
);

export type TotalWaterChartInputType = z.infer<typeof TotalWaterChartInput>;
