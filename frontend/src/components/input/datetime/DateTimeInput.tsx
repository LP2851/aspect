import "./DateTimeInput.css";

import { type ChangeEventHandler, memo } from "react";

import Label from "../label/Label.tsx";

const DateTimeInput = ({
  id,
  label,
  autocomplete,
  onChange,
  value,
  disabled,
  error,
  required,
}: {
  id?: string;
  label?: string;
  autocomplete?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="datetime-input-group">
      {label && <Label id={inputId} message={label} required={required} />}
      <input
        id={inputId}
        type="datetime-local"
        className={`datetime-input ${error ? "error" : ""}`}
        autoComplete={autocomplete ? "on" : "off"}
        onChange={onChange}
        value={value}
        disabled={disabled}
        required={required}
      />
      {error && <span className="datetime-input-error">{error}</span>}
    </div>
  );
};

export default memo(DateTimeInput);
