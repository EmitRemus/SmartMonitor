import type { MaskitoOptions } from '@maskito/core';
import { maskitoNumberOptionsGenerator } from '@maskito/kit';

import type { TextInputFieldType } from '@/components/input/textInput/textInputField/types/TextInputFieldType';
import { meterPreprocessorTextInputField } from '@/components/input/textInput/textInputField/types/mask/preprocessor/meter.preprocessor.textInputField';

export const maskTextInputFieldMap: Record<TextInputFieldType, MaskitoOptions> =
  {
    id: {
      mask: /^(([1-9][0-9]*)-?)+$/,
    },
    currency: maskitoNumberOptionsGenerator({
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      postfix: '€',
      min: 0,
    }),
    meter: {
      mask: [
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '.',
        /\d/,
        /\d/,
      ],
      overwriteMode: 'replace',
      preprocessors: [meterPreprocessorTextInputField],
    },
    none: {
      mask: /^.*$/,
    },
  };
