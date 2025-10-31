import "./PageWithLeftSidebar.css";
import LeftSidebar from "./left-sidebar/LeftSidebar.tsx";
import {type ReactNode, useEffect} from "react";
import {useLocation, useNavigate} from "react-router";
import type { SidebarContentMapping } from "./types";

interface PageWithLeftSidebarProps {
  title: string;
  contentMapping: SidebarContentMapping[];
  defaultKey: string;
  path: string;
}

const renderContent = (mappings: SidebarContentMapping[]): ReactNode => {
  const pathKey = new URLSearchParams(window.location.search).get("element") || "";
  for (const mapping of mappings) {
    if (pathKey === mapping.key) {
      if (mapping.element) {
        return mapping.element;
      }
      if (mapping.func) {
        mapping.func();
        return;
      }
      return <></>;
    }
    if (mapping.subElementMapping) {
      for (const subMapping of mapping.subElementMapping) {
        if (pathKey === subMapping.key) {
          if (subMapping.element) {
            return subMapping.element;
          }
          if (subMapping.func) {
            subMapping.func();
            return;
          }
          return <></>;
        }
      }
    }
  }

  return <></>;
}

const PageWithLeftSidebar = (props: PageWithLeftSidebarProps) => {
  const { title, contentMapping, defaultKey, path } = props;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.search) {
      const url = new URLSearchParams(window.location.search);
      url.set("element", defaultKey);
      navigate(`${path}?${url.toString()}`);
    }
  }, []);

  return (
    <div className="page-with-left-sidebar-container">
      <LeftSidebar
        onSelectElement={(key) => {navigate(path + "?element=" + key)}}
        renderContentMapping={contentMapping}
      />
      <main className="page-content">
        <h1>{title}</h1>
        {renderContent(contentMapping)}
      </main>
    </div>
  );
}

export default PageWithLeftSidebar;
