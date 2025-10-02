import "./Card.css";

import { memo, type PropsWithChildren } from "react";

const Card = ({ children }: PropsWithChildren) => {
  return <div className="card">{children}</div>;
};

export default memo(Card);
