import { useState, memo } from "react";
import "./ConfigBox.css";

const ConfigBox = ({
  children,
  name,
  description,
}: {
  children: any;
  name: string;
  description: string;
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="setting-config-box">
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => setCollapsed(!collapsed)}
      >
        <h4>{name}</h4>
        <button className="toggle-btn">{collapsed ? "+" : "-"}</button>
      </header>

      {!collapsed && (
        <div className="content-inner">
          <p className="settings-desc">{description}</p>
          {children}
        </div>
      )}
    </div>
  );
};

export default memo(ConfigBox);
