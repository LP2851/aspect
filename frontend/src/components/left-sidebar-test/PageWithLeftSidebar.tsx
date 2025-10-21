import "./PageWithLeftSidebar.css";
import LeftSidebar from "./LeftSidebar.tsx";
import {type ReactNode, useEffect} from "react";
import {useLocation, useNavigate} from "react-router";

interface ContentMapping {
  key: string;
  element: ReactNode;
  itemName: string;
}

interface PageWithLeftSidebarProps {
  title: string;
  contentMapping: any;
  defaultKey: string;
  path: string;
}

const renderContent = (currentPath: string, mappings: ContentMapping[]): ReactNode => {
    for (const mapping of mappings) {
      if (currentPath === mapping.key) {
        return mapping.element;
      }
    }
    return <></>;
}

const PageWithLeftSidebar = (props: PageWithLeftSidebarProps) => {
  const { title, contentMapping, defaultKey, path } = props;
  // const [selection, setSelection] = useState<string>(defaultKey);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === path) {
      navigate(path + "/" + defaultKey);
    }
  }, []);

  return (
    <div className="page-with-left-sidebar-container">
      <LeftSidebar
        onSelectElement={(key) => {navigate(path + key)}}
        renderContentMapping={contentMapping}
      />
      <main className="page-content">
        <h1>{title}</h1>
        {renderContent(location.pathname, contentMapping)}
      </main>
    </div>
  );
}

export default PageWithLeftSidebar
