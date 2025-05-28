import type { MaskitoPreprocessor } from '@maskito/core';

export const meterPreprocessorTextInputField: MaskitoPreprocessor = (
  { elementState, data },
  actionType,
) => {
  if (!['deleteBackward', 'deleteForward'].includes(actionType)) {
    return { elementState, data };
  }
  const { value, selection } = elementState;
  const [from, to] = selection;

  const cursorNewPosition = actionType === 'deleteBackward' ? from : to;

  const left = value.slice(0, from);
  const right = value.slice(to);

  const hasDot = left.indexOf('.') !== -1 || right.indexOf('.') !== -1;
  const newValue = hasDot
    ? left + '0'.repeat(to - from) + right
    : left.padEnd(9, '0') + '.' + right.padStart(2, '0');

  return {
    elementState: {
      value: newValue,
      selection: [cursorNewPosition, cursorNewPosition],
    },
    data,
  };
};
