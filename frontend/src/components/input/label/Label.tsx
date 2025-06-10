import { memo } from "react";
import "./Label.css";

const Label = ({ id, message }: { id: string; message: string }) => (
  <label className="label" htmlFor={id}>
    {message}
  </label>
);

export default memo(Label);
