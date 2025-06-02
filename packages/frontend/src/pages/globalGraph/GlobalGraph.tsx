import { Box, Flex } from '@radix-ui/themes';

import { useState } from 'react';
import Tree from 'react-d3-tree';

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

  return (
    <Flex direction="row" className="w-lvw h-lvh">
      <Box className="w-full h-full bg-slate-100">
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
      </Box>
      <GlobalGraphInfoBar
        selectedData={selectedNodeData}
        isInfoBarShown={isInfoBarShown}
        setIsInfoBarShown={(value: boolean) => setIsInfoBarShown(value)}
      />
    </Flex>
  );
};

export default GlobalGraph;
