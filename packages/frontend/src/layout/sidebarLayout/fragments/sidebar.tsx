import { Box, Flex, Text } from '@radix-ui/themes';

import { ArrowLeft } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { SidebarBoxOfEntries } from '@/layout/sidebarLayout/fragments/sidebarBoxOfEntries';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      <Box
        className={twMerge(
          'fixed top-0 left-0 w-full h-full bg-black',
          'transition-[opacity] duration-300 ease-linear',
          isOpen ? 'opacity-35' : 'opacity-0 pointer-events-none',
        )}
        onClick={() => isOpen && onClose()}
      />

      <Box
        className={twMerge(
          'w-90 p-2 fixed top-0 left-0 h-dvh bg-palette-blue-sapphire',
          'transition-transform duration-400 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <Flex
          justify="between"
          align="center"
          direction="column"
          className={twMerge(
            'w-full border-[0.085rem] border-dashed border-white h-full',
            'relative pt-5 gap-8',
          )}
        >
          <button
            className="cursor-pointer absolute right-2 top-2"
            onClick={onClose}
          >
            <ArrowLeft className="text-white stroke-2 w-10 h-12" />
          </button>

          <Flex direction="column" align="center">
            <img src="/icon-white.svg" className="h-20" />
            <Text className="text-white font-bold text-xl">SmartMonitor</Text>
          </Flex>

          <Flex
            direction="column"
            justify="center"
            className="w-full h-full pl-7 overflow-hidden "
          >
            <Flex
              direction="column"
              className="gap-14 overflow-y-auto box-border"
            >
              {SidebarMap.map((entry) => (
                <SidebarBoxOfEntries values={entry} onLinkClick={onClose} />
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

type SidebarMapType = readonly { label: string; to: string }[][];

const SidebarMap: SidebarMapType = Object.freeze([
  [
    {
      label: 'Home',
      to: '/',
    },
    {
      label: 'All apartments',
      to: '/apartment/all',
    },
    {
      label: 'All buildings [no]',
      to: '/building/all',
    },
    {
      label: 'All pipes [no]',
      to: '/pipe/all',
    },
    {
      label: 'All pump stations [no]',
      to: '/station/all',
    },
  ],
  [
    {
      label: 'Global graph [no]',
      to: '/statistics/global-graph',
    },
    {
      label: 'Charts [no]',
      to: '/statistics/charts',
    },
  ],
  [
    {
      label: 'Settings',
      to: '/settings',
    },
    {
      label: 'Settings',
      to: '/settings',
    },
    {
      label: 'Settings',
      to: '/settings',
    },
    {
      label: 'Settings',
      to: '/settings',
    },
  ],
]);
