import { useMaskito } from '@maskito/react';
import { TextField } from '@radix-ui/themes';

import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import type { TextInputFieldType } from '@/components/input/textInput/textInputField/types/TextInputFieldType';
import { defaultPlaceholderTextInputFieldMap } from '@/components/input/textInput/textInputField/types/defaultPlaceholder.textInputFieldMap';
import { defaultValueTextInputFieldMap } from '@/components/input/textInput/textInputField/types/defaultValue.textInputFieldMap';
import { maskTextInputFieldMap } from '@/components/input/textInput/textInputField/types/mask/mask.textInputFieldMap';
import { onBlurTextInputFieldMap } from '@/components/input/textInput/textInputField/types/onBlur.textInputFieldMap';

interface TextInputFieldProps {
  placeholder?: string;
  children: ReactNode[] | ReactNode;
  className?: string;
  onChange?: (value: string) => void;
  value?: string;
  type: TextInputFieldType;
  disabled?: boolean;
}

export const TextInputField = ({
  placeholder: placeholderProp,
  className,
  onChange: onChangeProp,
  value: valueProp,
  type,
  disabled,
  children,
}: TextInputFieldProps) => {
  const nodes = React.Children.toArray(children);
  const inputRef = useMaskito({ options: maskTextInputFieldMap[type] });
  const postProcess = onBlurTextInputFieldMap[type];

  const [value, onChange] = useState<string>(
    valueProp ?? defaultValueTextInputFieldMap[type],
  );

  useEffect(() => {
    if (valueProp !== undefined) onChange(valueProp);
  }, [valueProp]);

  const onChangeInputValue = (input: string) => {
    onChange(input);
    onChangeProp?.(input);
  };

  const placeholder =
    placeholderProp === undefined
      ? defaultPlaceholderTextInputFieldMap[type]
      : placeholderProp;

  return (
    <TextField.Root
      onInput={(event) => onChangeInputValue(event.currentTarget.value)}
      onBlur={(event) =>
        onChangeInputValue(postProcess(event.currentTarget.value))
      }
      placeholder={placeholder}
      value={value}
      ref={inputRef}
      className={twMerge(
        '!shadow-[inset_0_0_0_1px_theme(colors.palette.blue-sapphire)]',
        'w-150 !h-15 !rounded-[0.625rem]',
        '!text-[1.25rem] !leading-[3px] !font-[Raleway] !tracking-wide !pl-3',
        '!bg-none',
        'cssHacksInputNoFocusOutline',
        className,
      )}
      disabled={disabled ?? false}
    >
      {nodes.map((node, index) => {
        const isFirst = index === 0;
        const isLast = index === nodes.length - 1;

        return (
          <TextField.Slot
            key={index}
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
