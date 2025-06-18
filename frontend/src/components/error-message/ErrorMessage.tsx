import { memo } from "react";
import "./ErrorMessage.css";

const ErrorMessage = ({ message }: { message?: string }) => (
  <>{message && <p className="error-message">{message}</p>}</>
);

export default memo(ErrorMessage);
