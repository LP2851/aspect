import { memo } from "react";
import type ButtonTypes from "./ButtonTypes.ts";
import "./Button.css";

const Button = ({
  value,
  onClick,
  type,
  style,
}: {
  value: string;
  onClick: any;
  type: ButtonTypes;
  style?: any;
}) => (
  <button
    className={`button ${type.toString()}`}
    onClick={onClick}
    style={style}
  >
    {value}
  </button>
);

export default memo(Button);
