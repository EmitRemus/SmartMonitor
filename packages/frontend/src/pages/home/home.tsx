import { Flex } from '@radix-ui/themes';

import { Search, Settings } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { TextInputField } from '../../components/input/textInput/TextInputField';

export const Home = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');

  const onSearchChange = (value: string | null) => {
    if (/^([1-9]+-?)*$/.test(value ?? '')) setSearchValue(value ?? '');
  };

  return (
    <Flex justify="center" align="center" className="relative w-dvw h-dvh">
      <h1 className="text-palette-blue-sapphire w-full text-center text-[3.25rem] absolute top-5">
        SmartMonitor
      </h1>
      <TextInputField
        value={searchValue}
        onChange={onSearchChange}
        placeholder="Search by apartment id..."
      >
        <button
          className="cursor-pointer"
          onClick={() => alert(`search for ${searchValue}`)}
        >
          <Search className="text-palette-blue-sapphire w-8 h-8" />
        </button>
      </TextInputField>
      <button className="cursor-pointer absolute right-4 bottom-2">
        <Settings
          onClick={() => navigate('/settings')}
          className="text-palette-blue-sapphire stroke-[1px] w-16 h-16"
        />
      </button>
    </Flex>
  );
};
