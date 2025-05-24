import { TextField } from '@radix-ui/themes';

import type { ReactNode } from 'react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface TextInputFieldProps {
  placeholder?: string;
  children: ReactNode[] | ReactNode;
  className?: string;
  onChange?: (value: string | null) => void;
  value?: string | number;
}

export const TextInputField = ({
  placeholder,
  className,
  onChange,
  value,
  children,
}: TextInputFieldProps) => {
  const nodes = React.Children.toArray(children);
  return (
    <TextField.Root
      onChange={(event) => onChange?.(event.target.value)}
      placeholder={placeholder}
      value={value}
      className={twMerge(
        '!shadow-[inset_0_0_0_1px_theme(colors.palette.blue-sapphire)]',
        'w-150 !h-15 !rounded-[0.625rem]',
        '!text-[1.25rem] !leading-[3px] !font-[Raleway] !tracking-wide !pl-3',
        'cssHacksInputNoFocusOutline',
        className,
      )}
    >
      {nodes.map((node, index) => {
        const isFirst = index === 0;
        const isLast = index === nodes.length - 1;

        return (
          <TextField.Slot
            side="right"
            pl={isFirst ? '3' : '1'}
            pr={isLast ? '3' : '1'}
          >
            {node}
          </TextField.Slot>
        );
      })}
    </TextField.Root>
  );
};
