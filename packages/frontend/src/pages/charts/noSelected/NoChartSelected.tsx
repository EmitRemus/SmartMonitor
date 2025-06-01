import { Flex, Text } from '@radix-ui/themes';

const NoChartSelected = () => {
  return (
    <Flex align="center" justify="center" className="pt-5">
      <Text className="text-2xl font-medium">No chart selected</Text>
    </Flex>
  );
};

export default NoChartSelected;
