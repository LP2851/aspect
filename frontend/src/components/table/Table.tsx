import "./Table.css";

import { memo, type ReactNode } from "react";

interface TableProps {
  headers: string[];
  children: ReactNode;
  style?: any;
}

const Table = ({ headers, children, style }: TableProps) => {
  return (
    <table className="app-table" style={style}>
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
