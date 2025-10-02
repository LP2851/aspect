import "./LeftSidebar.css";

import { memo, type ReactNode, useState } from "react";

interface LeftSidebarProps {
  header: string;
  renderContentMapping: {
    [key: string]: { element: ReactNode; itemName: string };
  };
  sidebarFooter?: ReactNode;
}

const LeftSidebar = (props: LeftSidebarProps) => {
  const { header, renderContentMapping, sidebarFooter } = props;
  const [selectedSection, setSelectedSection] = useState<string | null>(
    renderContentMapping ? Object.keys(renderContentMapping)[0] : null,
  );

  const renderContent = () => {
    if (
      selectedSection &&
      renderContentMapping &&
      renderContentMapping[selectedSection]
    ) {
      return renderContentMapping[selectedSection].element;
    }
    return <></>;
  };

  return (
    <>
      <aside className="left-sidebar">
        <ul className="sidebar-menu">
          {renderContentMapping &&
            Object.keys(renderContentMapping).map((key) => (
              <li key={key} onClick={() => setSelectedSection(key)}>
                {renderContentMapping[key].itemName}
              </li>
            ))}
        </ul>
        {sidebarFooter && <div className="sidebar-footer">{sidebarFooter}</div>}
      </aside>

      <main className="main-content">
        <h1>{header}</h1>
        {renderContent()}
      </main>
    </>
  );
};

export default memo(LeftSidebar);
