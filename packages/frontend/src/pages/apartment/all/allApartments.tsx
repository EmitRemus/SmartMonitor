import { Box } from '@radix-ui/themes';

import { BorderedTableDataPresentation } from '@/components/dataPresentation/borderedTableDataPresentation/borderedTableDataPresentation';
import type { TableDataPresentationData } from '@/components/dataPresentation/tableDataPresentation/types/tableDataPresentationData';

const data: TableDataPresentationData = {
  columns: {
    user: 'string',
    meter: 'meter',
    lastTime: 'date',
    water: 'temperature',
  },
  data: [
    ['Kaelen', 114, '2025-05-14T13:10:00Z', 23.9],
    ['Lyra', 115, '2025-05-15T14:20:00Z', 25.5],
    ['Orion', 116, '2025-05-16T09:40:00Z', 26.8],
    ['Zephyr', 117, '2025-05-17T10:55:00Z', 24.0],
    ['Anya', 118, '2025-05-18T11:00:00Z', 25.2],
    ['Thorne', 119, '2025-05-19T08:10:00Z', 27.0],
    ['Elara', 120, '2025-05-20T09:35:00Z', 23.5],
    ['Corvus', 121, '2025-05-21T10:25:00Z', 26.7],
    ['Isolde', 122, '2025-05-22T07:50:00Z', 24.9],
    ['Jax', 123, '2025-05-23T08:40:00Z', 25.8],
    ['Rowan', 124, '2025-05-24T09:05:00Z', 24.3],
    ['Silas', 125, '2025-05-25T11:15:00Z', 26.2],
    ['Freya', 126, '2025-05-26T12:30:00Z', 25.1],
    ['Magnus', 127, '2025-05-27T13:45:00Z', 27.5],
    ['Luna', 128, '2025-05-28T14:00:00Z', 23.0],
  ],
  dataId: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28], // Updated dataId to match the generated data
};

const AllApartments = () => {
  return (
    <Box className="pt-40 w-full">
      <h2 className="text-3xl pl-5 pb-1">All apartments</h2>
      <BorderedTableDataPresentation data={data} />
    </Box>
  );
};

export default AllApartments;
