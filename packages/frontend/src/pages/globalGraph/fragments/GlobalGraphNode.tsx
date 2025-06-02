import { Flex, Text } from '@radix-ui/themes';

import type { CustomNodeElementProps } from 'react-d3-tree';

export const GlobalGraphNode = ({
  nodeDatum,
  toggleNode,
  onNodeClick,
}: CustomNodeElementProps) => {
  const fraudFactor = (nodeDatum.attributes?.['fraudFactor'] ?? 0) as number;
  const totalHotVolume = nodeDatum.attributes!.totalHotWater;
  const totalColdVolume = nodeDatum.attributes!.totalColdWater;

  let totalVolume: null | number = null;
  if (
    typeof totalHotVolume === 'number' &&
    typeof totalColdVolume === 'number'
  ) {
    totalVolume = totalHotVolume + totalColdVolume;
  }

  return (
    <g>
      <circle
        r={15}
        fill={getColor(fraudFactor)}
        strokeWidth="1"
        onClick={toggleNode}
      />
      <foreignObject
        x={15}
        y={10}
        width={250}
        height={150}
        onClick={onNodeClick}
      >
        <Flex
          direction="column"
          className="bg-white/90 bg-blend-soft-light w-full h-full p-5 gap-5 rounded-md border-2 border-palette-blue-sapphire border-dashed"
        >
          <h3 className="text-center font-medium underline">
            {nodeDatum.name}
          </h3>
          <Flex direction="column" className="gap-3">
            <Text>Fraud factor {nodeDatum.attributes!.fraudFactor ?? 0}%</Text>
            {totalVolume !== null && (
              <Text>
                Volume {'\0'}
                {(nodeDatum.attributes!.totalHotWater as number) +
                  (nodeDatum.attributes!.totalColdWater as number)}{' '}
                m<sup>3</sup>
              </Text>
            )}
          </Flex>
        </Flex>
      </foreignObject>
    </g>
  );
};

function getColor(fraudFactor: number): string {
  if (fraudFactor < 11) return '#00FF00'; // bright green
  if (fraudFactor < 22) return '#80FF00'; // yellow-green
  if (fraudFactor < 33) return '#FFFF00'; // yellow
  if (fraudFactor < 44) return '#FFBF00'; // yellow-orange
  if (fraudFactor < 55) return '#FFA500'; // orange
  if (fraudFactor < 66) return '#FF5C00'; // orange-red
  if (fraudFactor < 77) return '#FF0000'; // red
  if (fraudFactor < 88) return '#8000FF'; // purple
  return '#8B00FF'; // violet
}
