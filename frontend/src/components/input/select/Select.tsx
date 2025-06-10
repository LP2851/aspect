import { type ChangeEventHandler, memo } from "react";
import Label from "../label/Label.tsx";
import "./Select.css";

const Select = ({
  id,
  label,
  options,
  value,
  onChange,
  defaultOption,
}: {
  id: string;
  label?: string;
  options?: string[];
  value?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  defaultOption?: string;
}) => (
  <>
    {label && <Label id={id} message={label} />}

    <select id={id} className="select-input" value={value} onChange={onChange}>
      {defaultOption && <option value={defaultOption}>{defaultOption}</option>}

      {options &&
        options?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
    </select>
  </>
);

export default memo(Select);
