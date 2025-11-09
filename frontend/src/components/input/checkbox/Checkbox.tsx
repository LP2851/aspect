import "./Checkbox.css";

import { type ChangeEvent, memo } from "react";

export interface CheckboxProps {
  id: string;
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({
  name,
  value,
  label,
  checked = false,
  onChange,
}: CheckboxProps) => {
  return (
    <label className="checkbox-label">
      <input
        type="checkbox"
        className="input-checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="custom-check"></span>
      {label}
    </label>
  );
};

export default memo(Checkbox);
