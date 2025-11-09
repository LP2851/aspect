import "./Label.css";

import { memo } from "react";

const Label = ({
  id,
  message,
  required = false,
}: {
  id: string;
  message: string;
  required?: boolean;
}) => (
  <label className="label" htmlFor={id}>
    {message}
    {required && <span className="required-asterisk">*</span>}
  </label>
);

export default memo(Label);
