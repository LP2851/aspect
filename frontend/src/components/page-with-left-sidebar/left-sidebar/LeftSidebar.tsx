import type {ReactNode} from "react";
import "./LeftSidebar.css";
import type { SidebarContentMapping } from "../types";

interface LeftSidebarProps {
  renderContentMapping?: SidebarContentMapping[];
  sidebarFooter?: ReactNode;

  onSelectElement: (key: string) => void;
}

const LeftSidebar = (props: LeftSidebarProps) => {
  const { renderContentMapping, sidebarFooter, onSelectElement } = props;

  return (
    <>
      <aside className="left-sidebar">
        <ul className="sidebar-menu">
          {renderContentMapping &&
            renderContentMapping.map((mapping) => {
              return (
                <div key={mapping.key}>
                  <li onClick={() => onSelectElement(mapping.key)}>
                    {mapping.itemName}
                  </li>
                  {mapping.subElementMapping && (
                    <ul className="sidebar-menu-sublist">
                      {mapping.subElementMapping.map((subMapping) => (
                        <li key={subMapping.key} onClick={() => onSelectElement(subMapping.key)}>
                          {subMapping.itemName}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
        </ul>
        {sidebarFooter && <div className="sidebar-footer">{sidebarFooter}</div>}
      </aside>
    </>
  );
};

export default LeftSidebar;
