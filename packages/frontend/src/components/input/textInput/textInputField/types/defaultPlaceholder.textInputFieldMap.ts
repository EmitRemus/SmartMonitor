import type { TextInputFieldType } from '@/components/input/textInput/textInputField/types/TextInputFieldType';

export const defaultPlaceholderTextInputFieldMap: Record<
  TextInputFieldType,
  string
> = {
  id: '10-000',
  currency: '0.00€',
  meter: '000000000.00',
  none: '',
};
