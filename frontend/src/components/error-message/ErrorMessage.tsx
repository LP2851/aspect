import "./ErrorMessage.css";

import { memo } from "react";

const ErrorMessage = ({ message }: { message?: string }) => (
  <>{message && <p className="error-message">{message}</p>}</>
);

export default memo(ErrorMessage);
