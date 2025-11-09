import "./TextInput.css";

import { type ChangeEventHandler, memo } from "react";

import Label from "../label/Label.tsx";

const TextInput = ({
  id,
  label,
  autocomplete,
  placeholder,
  onChange,
  value,
  disabled,
  inputType,
  error,
  required,
}: {
  id?: string;
  label?: string;
  autocomplete?: boolean;
  placeholder: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  disabled?: boolean;
  inputType?: string;
  error?: string;
  required?: boolean;
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="text-input-group">
      {label && <Label id={inputId} message={label} required={required} />}
      <input
        id={inputId}
        type={inputType ?? "text"}
        className={`text-input ${error ? "error" : ""}`}
        autoComplete={autocomplete ? "on" : "off"}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
      />
      {error && <span className="text-input-error">{error}</span>}
    </div>
  );
};

export default memo(TextInput);
