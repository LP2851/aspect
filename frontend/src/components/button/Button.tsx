import "./Button.css";

import {
  type ButtonHTMLAttributes,
  type FC,
  memo,
  type ReactNode,
} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  extraClasses?: string;
  variant?: "primary" | "secondary" | "danger" | "fancy-primary";
}

const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  disabled,
  type = "button",
  extraClasses,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`button ${"button-" + variant + (extraClasses ? " " + extraClasses : "")}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default memo(Button);
