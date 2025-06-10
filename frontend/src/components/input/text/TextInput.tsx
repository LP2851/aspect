import { type ChangeEventHandler, memo } from "react";
import Label from "../label/Label.tsx";
import "./TextInput.css";

const TextInput = ({
  id,
  label,
  autocomplete,
  placeholder,
  onChange,
  value,
}: {
  id: string;
  label?: string;
  autocomplete: boolean;
  placeholder: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}) => (
  <>
    {label && <Label id={id} message={label} />}
    <input
      id={id}
      type="text"
      className="text-input"
      autoComplete={autocomplete ? "on" : "off"}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  </>
);

export default memo(TextInput);
