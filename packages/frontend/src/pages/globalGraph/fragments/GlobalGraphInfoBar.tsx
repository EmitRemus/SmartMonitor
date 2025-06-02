import { Box, Button, DataList, Flex } from '@radix-ui/themes';

import { twMerge } from 'tailwind-merge';

import type { SelectedNodeData } from '@/pages/globalGraph/types/selectedNodeData';

type GlobalGraphInfoBarProps = {
  isInfoBarShown: boolean;
  setIsInfoBarShown: (isShown: boolean) => void;
  selectedData: SelectedNodeData | null;
};

export const GlobalGraphInfoBar = ({
  isInfoBarShown,
  setIsInfoBarShown,
  selectedData,
}: GlobalGraphInfoBarProps) => {
  const labelClassName = '!text-palette-blue-sapphire !font-bold';
  console.log(selectedData);

  return (
    <Flex
      direction="column"
      justify="between"
      className={twMerge(
        'bg-gray-700 text-white p-6 px-8 fixed top-0 right-0 w-[35%] h-full',
        'transition-transform duration-300 ease-out',
        !isInfoBarShown && 'translate-x-[100%]',
      )}
    >
      <Box>
        <h2 className="text-2xl pb-0 text-center">InfoBar</h2>
        {selectedData && (
          <>
            <h3 className="pb-6 text-center text-sm font-light relative -top-[0.45rem]">
              {selectedData.name}
            </h3>
            <DataList.Root className="space-y-2 pl-5">
              <DataList.Item>
                <DataList.Label className={labelClassName}>ID</DataList.Label>
                <DataList.Value>{selectedData.id}</DataList.Value>
              </DataList.Item>

              <DataList.Item>
                <DataList.Label className={labelClassName}>Type</DataList.Label>
                <DataList.Value>{selectedData.type}</DataList.Value>
              </DataList.Item>

              {selectedData.totalHotWater !== undefined && (
                <DataList.Item>
                  <DataList.Label className={labelClassName}>
                    Total Hot Water
                  </DataList.Label>
                  <DataList.Value>
                    {selectedData.totalHotWater} m³
                  </DataList.Value>
                </DataList.Item>
              )}

              {selectedData.totalColdWater !== undefined && (
                <DataList.Item>
                  <DataList.Label className={labelClassName}>
                    Total Cold Water
                  </DataList.Label>
                  <DataList.Value>
                    {selectedData.totalColdWater} m³
                  </DataList.Value>
                </DataList.Item>
              )}

              {selectedData.consumption !== undefined && (
                <DataList.Item>
                  <DataList.Label className={labelClassName}>
                    Consumption
                  </DataList.Label>
                  <DataList.Value>{selectedData.consumption} m³</DataList.Value>
                </DataList.Item>
              )}

              {selectedData.fraudFactor !== undefined && (
                <DataList.Item>
                  <DataList.Label className={labelClassName}>
                    Fraud Factor
                  </DataList.Label>
                  <DataList.Value>{selectedData.fraudFactor}%</DataList.Value>
                </DataList.Item>
              )}

              {selectedData.lastReading !== undefined && (
                <DataList.Item>
                  <DataList.Label className={labelClassName}>
                    Last Reading
                  </DataList.Label>
                  <DataList.Value>{selectedData.lastReading}</DataList.Value>
                </DataList.Item>
              )}
            </DataList.Root>
          </>
        )}
      </Box>

      <Button
        onClick={() => setIsInfoBarShown(false)}
        className="text-white !cursor-pointer absolute bottom-4 left-1/2 transform -translate-x-1/2"
      >
        Close
      </Button>
    </Flex>
  );
};
