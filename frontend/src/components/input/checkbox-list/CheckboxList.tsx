import { type ChangeEvent, memo, useState } from "react";

import Checkbox, { type CheckboxProps } from "../checkbox/Checkbox.tsx";
import Label from "../label/Label.tsx";

interface CheckboxListProps {
  id: string;
  label: string;
  checkboxes: Omit<CheckboxProps, "onChange">[];
  onChange: (checkedValues: string[]) => void;
}

const CheckboxList = ({
  id,
  label,
  checkboxes,
  onChange,
}: CheckboxListProps) => {
  const [checkedStates, setCheckedStates] = useState<Record<string, boolean>>(
    () => {
      const initial: Record<string, boolean> = {};
      checkboxes.forEach((checkbox) => {
        initial[checkbox.value] = checkbox.checked;
      });
      return initial;
    },
  );

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    const newCheckedStates = {
      ...checkedStates,
      [value]: checked,
    };

    setCheckedStates(newCheckedStates);

    // Call onChange with the updated checked values
    const checkedValues = Object.entries(newCheckedStates)
      .filter(([_, isChecked]) => isChecked)
      .map(([value, _]) => value);

    onChange(checkedValues);
  };

  return (
    <>
      <Label id={id} message={label} />
      {checkboxes.map((checkbox) => (
        <>
          <Checkbox
            key={checkbox.id}
            id={checkbox.id}
            name={checkbox.name}
            value={checkbox.value}
            label={checkbox.label}
            checked={checkedStates[checkbox.value] || false}
            onChange={handleCheckboxChange}
          />
          <br />
        </>
      ))}
    </>
  );
};

export default memo(CheckboxList);
