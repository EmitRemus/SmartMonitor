import { Box, Flex } from '@radix-ui/themes';
import { Text } from '@radix-ui/themes';

import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import Tree from 'react-d3-tree';

import { useFetchFraudGraph } from '@/hooks/dataFetch/graph/useFetch.fraudGraph';
import useWindowDimensions from '@/hooks/system/useWindowDimensions/useWindowDimensions';
import { fakeGlobalGraphData } from '@/pages/globalGraph/fake_data';
import { GlobalGraphInfoBar } from '@/pages/globalGraph/fragments/GlobalGraphInfoBar';
import { GlobalGraphNode } from '@/pages/globalGraph/fragments/GlobalGraphNode';
import type { SelectedNodeData } from '@/pages/globalGraph/types/selectedNodeData';

const GlobalGraph = () => {
  const { width, height } = useWindowDimensions();
  const [isInfoBarShown, setIsInfoBarShown] = useState<boolean>(false);
  const [selectedNodeData, setSelectedNodeData] =
    useState<SelectedNodeData | null>(null);

  const data = useFetchFraudGraph();

  let Graph = (
    <Flex className="w-full h-full" align="center" justify="center">
      <Loader2Icon className="animate-spin w-10 h-10 text-palette-blue-sapphire" />
    </Flex>
  );

  if (data !== null) {
    if (!data[0].isSuccess || data[0].data === null) {
      Graph = (
        <Flex className="w-full h-full" align="center" justify="center">
          <Text className="text-lg">
            Failed to get correct data from server
          </Text>
        </Flex>
      );
    } else {
      Graph = (
        <Tree
          data={fakeGlobalGraphData}
          translate={{ x: width * 0.1, y: height / 2 }}
          pathFunc="diagonal"
          separation={{ siblings: 1.5, nonSiblings: 2 }}
          depthFactor={300}
          initialDepth={2}
          renderCustomNodeElement={(rd3tProps) => GlobalGraphNode(rd3tProps)}
          onNodeClick={(nodeData, _evt) => {
            console.log('Node clicked:', nodeData);
            setSelectedNodeData(
              nodeData.data.attributes as SelectedNodeData | null,
            );
            setIsInfoBarShown(true);
          }}
        />
      );
    }
  }

  return (
    <Flex direction="row" className="w-lvw h-lvh">
      <Box className="w-full h-full bg-slate-100">{Graph}</Box>
      <GlobalGraphInfoBar
        selectedData={selectedNodeData}
        isInfoBarShown={isInfoBarShown}
        setIsInfoBarShown={(value: boolean) => setIsInfoBarShown(value)}
      />
    </Flex>
  );
};

export default GlobalGraph;

/*

const WaterColdChart = () => {
  const data = useFetchChartTotalColdWater();



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

*/
