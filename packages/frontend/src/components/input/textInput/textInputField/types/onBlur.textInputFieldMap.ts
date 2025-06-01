import type { TextInputFieldType } from '@/components/input/textInput/textInputField/types/TextInputFieldType';

export const onBlurTextInputFieldMap: Record<
  TextInputFieldType,
  (value: string) => string
> = {
  id: (value) => value.replace(/-+$/, ''),
  currency: (value) => (value === '€' ? '0.00€' : value),
  meter: (value) => value,
  none: (value) => value,
};
