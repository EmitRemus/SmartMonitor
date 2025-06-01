import z from 'zod/v4';

const TabledInputDataSchema = z
  .object({
    columns: z.array(z.string()),
    data: z.array(z.array(z.union([z.number(), z.string(), z.null()]))).min(1),
    dataId: z.array(z.string()),
  })
  .refine((obj) => obj.data.length === obj.dataId.length, {
    abort: true,
    error: 'Arrays data and dataId should have the same length',
  })
  .refine((obj) => obj.data.every((row) => row.length == obj.data[0].length), {
    abort: true,
    error: 'Each row in data should have the same amount of data entries',
  })
  .refine((obj) => obj.data[0].length > 0, {
    abort: true,
    error: 'Should have at least one entry in data row',
  })
  .refine(
    (obj) => {
      for (
        let columnIndex = 0;
        columnIndex < obj.data[0].length;
        ++columnIndex
      ) {
        const checkType = typeof obj.data[0][columnIndex];
        const allMatch = obj.data.every(
          (row) => typeof row[columnIndex] === checkType,
        );
        if (!allMatch) return false;
      }
      return true;
    },
    {
      abort: true,
      error: 'All entries in the same column should be of the same type',
    },
  );

export const TabledInputSchema = z.object({
  data: TabledInputDataSchema,
  isFinished: z.boolean(),
  lastId: z.string().nullable(),
});

export type TabledInputType = z.infer<typeof TabledInputSchema>;
export type TabledInputDataType = z.infer<typeof TabledInputDataSchema>;
