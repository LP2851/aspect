import "./Tag.css";
import { memo } from "react";

type TagProps = {
  label: string;
  color?: "blue" | "green" | "red" | "yellow" | "purple" | "gray";
  children?: React.ReactNode;
};

const Tag = ({ label, color = "gray", children }: TagProps) => {
  return (
    <span className={`tag tag-${color}`}>
      {children}
      {label}
    </span>
  );
};

export default memo(Tag);
