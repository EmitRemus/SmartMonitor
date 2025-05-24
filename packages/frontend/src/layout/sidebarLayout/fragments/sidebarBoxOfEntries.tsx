import { Flex } from '@radix-ui/themes';

import { Link } from 'react-router';
import { twMerge } from 'tailwind-merge';

interface SidebarBoxOfEntriesProps {
  values: { label: string; to: string }[];
  onLinkClick: () => void;
}

export const SidebarBoxOfEntries = ({
  values,
  onLinkClick,
}: SidebarBoxOfEntriesProps) => {
  return (
    <Flex className="gap-6 flex flex-col items-start">
      {values.map((value) => (
        <Link
          to={value.to}
          onClick={onLinkClick}
          className={twMerge(
            'text-white text-xl inline-block relative',
            'after:content-[""] after:absolute after:left-0 after:bottom-[4px] after:w-0 after:h-[1.5px]',
            'after:bg-white after:transition-all after:duration-300 after:ease-out hover:after:w-full',
          )}
        >
          {value.label}
        </Link>
      ))}
    </Flex>
  );
};
