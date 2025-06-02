import { Flex, Text } from '@radix-ui/themes';

import { Loader2Icon } from 'lucide-react';

import { HeatMap } from '@/components/dataPresentation/heatMap/HeatMap';
import { useFetchFraudHeatmapChart } from '@/hooks/dataFetch/charts/useFetch.fraudHeatmapChart';

const FraudRiskChart = () => {
  const data = useFetchFraudHeatmapChart();

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
        <HeatMap
          className="w-[100%] grow-1"
          data={data[0].data.data.map((idValue) => ({
            id: idValue[0],
            fraudFactor: idValue[1],
          }))}
          dataLastUpdate={new Date()}
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
        <Text className="text-2xl font-medium">Fraud risk heatmap</Text>
        {Chart}
      </Flex>
    </>
  );
};

export default FraudRiskChart;
