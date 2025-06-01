import { Box } from '@radix-ui/themes';

import { type ApexOptions } from 'apexcharts';
import { useCallback, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';

type HeatMapEntry = {
  id: string;
  fraudFactor: number;
};

interface HeatMapProp {
  className?: string;
  data: HeatMapEntry[];
  dataLastUpdate: Date;
}

function formatData(data: HeatMapEntry[]): {
  name: string;
  data: number[];
}[] {
  // To nicely show square heatmap - separate data to
  // such amount of rows, as amount of columns
  // in other words: make square matrix of data points
  const squareSide = Math.ceil(Math.sqrt(data.length));
  console.log(squareSide);

  return Array.from({ length: squareSide }).map((_, row) => ({
    name: `${row}`,
    data: data
      .slice(row * squareSide, (row + 1) * squareSide)
      .map((entry) => entry.fraudFactor),
  }));
}

export const HeatMap = ({ className, data, dataLastUpdate }: HeatMapProp) => {
  // const navigate = useNavigate();

  const plotData = useMemo(
    () => formatData(data),
    // data is update with update of dataLastUpdate
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataLastUpdate.getTime()],
  );
  const squareSide = useMemo(
    () => Math.ceil(Math.sqrt(data.length)),
    // data is update with update of dataLastUpdate
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataLastUpdate.getTime()],
  );

  const makeTooltip = useCallback(
    ({
      series,
      seriesIndex: row,
      dataPointIndex: column,
    }: HeatMapCustomFunctionInput) =>
      `
      <div style="padding: 8px;">
        <strong>User ID ${data[row * squareSide + column].id}</strong>
        <br/>
        Fraud factor ${series[row][column].toFixed(2)}%
      </div>
    `,
    // data is update with update of dataLastUpdate
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataLastUpdate.getTime()],
  );

  const onClick = useCallback(
    (
      _1: never,
      _2: never,
      opts: { seriesIndex: string; dataPointIndex: string },
    ) => {
      const row = parseInt(opts.seriesIndex);
      const column = parseInt(opts.dataPointIndex);
      const index = row * squareSide + column;
      if (index > data.length - 1 || isNaN(index)) return;
      // navigate(`/apartment/${data[index].id}`); // TODO: uncomment when ready
      console.log(data[index].id);
    },
    // data is update with update of dataLastUpdate
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataLastUpdate.getTime()],
  );

  const options: ApexOptions = {
    ..._optionsRaw,
    tooltip: {
      enabled: true,
      custom: makeTooltip,
    },
    chart: {
      ..._optionsRaw.chart,
      events: {
        click: onClick,
      },
    },
  };

  return (
    <Box className={className}>
      <ReactApexChart
        width="100%"
        height="100%"
        type="heatmap"
        series={plotData}
        options={options}
      />
    </Box>
  );
};

type HeatMapCustomFunctionInput = {
  series: number[][];
  seriesIndex: number;
  dataPointIndex: number;
};

const _optionsRaw: ApexOptions = {
  chart: {
    type: 'heatmap' as const,
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
    selection: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    tooltip: {
      enabled: false,
    },
  },
  yaxis: {
    tooltip: {
      enabled: false,
    },
  },
  plotOptions: {
    heatmap: {
      shadeIntensity: 0.5,
      radius: 0,
      enableShades: true,
      distributed: true,
      useFillColorAsStroke: false,
      colorScale: {
        ranges: [
          {
            from: 0,
            to: 20,
            color: '#DCDCDC',
          },
          {
            from: 20,
            to: 40,
            color: '#E5A5A5',
          },
          {
            from: 40,
            to: 60,
            color: '#EE6E6E',
          },
          {
            from: 60,
            to: 80,
            color: '#F63737',
          },
          {
            from: 80,
            to: 100,
            color: '#FF0000',
          },
        ],
        inverse: false,
        min: 0,
        max: 100,
      },
    },
  },
};
