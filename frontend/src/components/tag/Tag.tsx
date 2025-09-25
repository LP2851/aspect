import "./Tag.css";

type TagProps = {
  label: string;
  color?: "blue" | "green" | "red" | "yellow" | "purple" | "gray";
  children?: React.ReactNode;
};

export const Tag = ({ label, color = "gray", children }: TagProps) => {
  return (
    <span className={`tag tag-${color}`}>
      {children}
      {label}
    </span>
  );
};
