import { memo } from "react";
import type ButtonTypes from "./ButtonTypes.ts";
import "./Button.css";

const Button = ({
  value,
  onClick,
  type,
}: {
  value: string;
  onClick: any;
  type: ButtonTypes;
}) => (
  <button className={`button ${type.toString()}`} onClick={onClick}>
    {value}
  </button>
);

export default memo(Button);
