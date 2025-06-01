import { Flex, Text } from '@radix-ui/themes';

import { Loader2Icon } from 'lucide-react';

import { ChartXY } from '@/components/dataPresentation/chartXY/ChartXY';
import { useFetchChartTotalColdWater } from '@/hooks/dataFetch/charts/useFetch.totalColdWaterChart';

const WaterColdChart = () => {
  const data = useFetchChartTotalColdWater();

  let Chart = (
    <Loader2Icon className="animate-spin w-10 h-10 text-palette-blue-sapphire" />
  );

  if (data !== null) {
    if (!data[0].isSuccess || data[0].data === null) {
      Chart = (
        <Text className="text-lg">Failed to get correct data from server</Text>
      );
    } else {
      Chart = (
        <ChartXY
          className="w-[100%] grow-1"
          data={data[0].data}
          dataLastUpdate={data[1]}
        />
      );
    }
  }

  return (
    <>
      <Flex
        align="center"
        direction="column"
        className="pt-5 h-120 w-full gap-1 pb-3 px-10"
      >
        <Text className="text-2xl font-medium">Cold water consumption</Text>
        {Chart}
      </Flex>
    </>
  );
};

export default WaterColdChart;
