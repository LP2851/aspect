import "./Card.css";

import { memo, type PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div className={"card" + (className ? " " + className : "")}>
      {children}
    </div>
  );
};

export default memo(Card);
