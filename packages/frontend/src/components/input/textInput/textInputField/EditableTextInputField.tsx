import { Check, PenBox, PenOff } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { TextInputField } from '@/components/input/textInput/textInputField/TextInputField';
import type { TextInputFieldType } from '@/components/input/textInput/textInputField/types/TextInputFieldType';

interface EditableTextInputFieldProps {
  value: string;
  onSave: (newValue: string) => void;
  type: TextInputFieldType;
  placeholder?: string;
  className?: string;
}

export const EditableTextInputField = ({
  value: valueProp,
  onSave,
  type,
  placeholder,
  className,
}: EditableTextInputFieldProps) => {
  const [editing, setEditing] = useState<boolean>(false);
  const fallbackValue = useRef<string>(valueProp);
  const [value, setValue] = useState<string>(valueProp);

  useEffect(() => {
    fallbackValue.current = valueProp;
    setValue(valueProp);
  }, [valueProp]);

  const startEdit = () => {
    setEditing(true);
  };
  const cancelEdit = () => {
    setValue(fallbackValue.current);
    setEditing(false);
  };
  const saveEdit = () => {
    fallbackValue.current = value;
    onSave(value);
    setEditing(false);
  };

  return (
    <TextInputField
      value={value}
      onChange={setValue}
      type={type}
      placeholder={placeholder}
      className={className}
      disabled={!editing}
    >
      {!editing ? (
        <>
          <button onClick={startEdit} className="cursor-pointer">
            <PenBox className="w-7 h-7 stroke-[1.5px] text-palette-blue-sapphire" />
          </button>
        </>
      ) : (
        <>
          <button onClick={saveEdit} className="cursor-pointer">
            <Check className="w-7 h-7 stroke-[1.5px] text-green-600" />
          </button>
          <button onClick={cancelEdit} className="cursor-pointer">
            <PenOff className="w-6 h-5 stroke-2 text-red-600" />
          </button>
        </>
      )}
    </TextInputField>
  );
};
