import { Box, Flex, Text } from '@radix-ui/themes';

import { useState } from 'react';

import { EditableTextInputField } from '@/components/input/textInput/textInputField/EditableTextInputField';

const Settings = () => {
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');
  const [value4, setValue4] = useState<string>('');
  const [value5, setValue5] = useState<string>('');

  return (
    <Flex direction="column" align="center" className="pt-40 gap-10 mb-10">
      <Box>
        <Text>
          Tariff / cold water / m<sup>3</sup>
        </Text>
        <EditableTextInputField
          value={value1}
          onSave={setValue1}
          type="currency"
        />
      </Box>

      <Box>
        <Text>
          Tariff / hot water / m<sup>3</sup>
        </Text>
        <EditableTextInputField
          value={value2}
          onSave={setValue2}
          type="currency"
        />
      </Box>

      <Box>
        <Text>
          Tariff / cold water (night) / m<sup>3</sup>
        </Text>
        <EditableTextInputField
          value={value3}
          onSave={setValue3}
          type="currency"
        />
      </Box>

      <Box>
        <Text>
          Tariff / hot water (night) / m<sup>3</sup>
        </Text>
        <EditableTextInputField
          value={value4}
          onSave={setValue4}
          type="currency"
        />
      </Box>

      <Box>
        <Text>
          Tariff / cold water (bottle) / m<sup>3</sup>
        </Text>
        <EditableTextInputField
          value={value5}
          onSave={setValue5}
          type="currency"
        />
      </Box>
    </Flex>
  );
};

export default Settings;
