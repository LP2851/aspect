import "./Select.css";

import { type ChangeEventHandler, memo } from "react";

import Label from "../label/Label.tsx";

const Select = ({
  id,
  label,
  description,
  options,
  value,
  onChange,
  defaultOption,
  defaultValue,
  required = false,
}: {
  id: string;
  label?: string;
  description?: string;
  options?: { value: string; label: string }[];
  value?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  required?: boolean;
  defaultOption?: string;
  defaultValue?: string;
}) => (
  <>
    {label && <Label id={id} message={label} required={required} />}
    {description && <p className="input-description">{description}</p>}

    <select id={id} className="select-input" value={value} onChange={onChange} required={required}>
      {defaultOption && <option value={defaultValue}>{defaultOption}</option>}

      {options &&
        options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  </>
);

export default memo(Select);
