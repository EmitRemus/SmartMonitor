import { Box } from '@radix-ui/themes';

import { type ApexOptions } from 'apexcharts';
import { useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';

type ChartXYEntry = {
  name: string;
  data: [Date, number][];
};
type ChartXYData = ChartXYEntry[];

interface ChartXYProp {
  className?: string;
  data: ChartXYData;
  dataLastUpdate: Date;
}

export const ChartXY = ({ className, data, dataLastUpdate }: ChartXYProp) => {
  const plotData = useMemo(
    () =>
      data.map(({ name, data: seriesData }) => ({
        name,
        data: seriesData.map(([date, value]) => [date.getTime(), value]),
      })),
    // data is update with update of dataLastUpdate
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataLastUpdate.getTime()],
  );

  return (
    <Box className={className}>
      <ReactApexChart
        width="100%"
        height="100%"
        type="area"
        series={plotData}
        options={options}
      />
    </Box>
  );
};

const options: ApexOptions = {
  chart: {
    type: 'area' as const,
    toolbar: {
      show: true,
      autoSelected: 'pan',
      offsetX: 0,
      offsetY: 0,
      tools: {
        download:
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17V3"/><path fill="white" d="m6 11 6 6 6-6"/><path d="M19 21H5"/></svg>',
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false,
      },
    },
    fontFamily: 'Raleway',
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    markers: {
      offsetX: -2,
    },
  },
  xaxis: {
    type: 'datetime',
  },
  yaxis: {
    labels: {
      formatter: (val: number) => val.toFixed(2),
    },
  },
  tooltip: {
    x: {
      format: 'dd/MM/yyyy',
    },
    y: {
      formatter: (val: number) => val.toFixed(2),
    },
  },
};
