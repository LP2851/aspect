import "./Table.css";

import { memo, type ReactNode } from "react";

interface TableProps {
  headers: string[];
  children: ReactNode;
}

const Table = ({ headers, children }: TableProps) => {
  return (
    <table className="app-table">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default memo(Table);
