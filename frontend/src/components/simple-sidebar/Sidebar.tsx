import { memo, useRef, useEffect, type PropsWithChildren } from "react";
import "./Sidebar.css";

const Sidebar = ({ children }: PropsWithChildren) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);

  const startResizing = () => {
    isResizing.current = true;
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResizing);
  };

  const resize = (e: MouseEvent) => {
    if (isResizing.current && sidebarRef.current) {
      const newWidth = window.innerWidth - e.clientX;
      sidebarRef.current.style.width = `${Math.min(Math.max(newWidth, 200), 600)}px`;
    }
  };

  const stopResizing = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResizing);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", stopResizing);
    };
  });

  return (
    <div className="sidebar-wrapper">
      <div className="resizer" onMouseDown={startResizing} />
      <div className="sidebar" ref={sidebarRef}>
        <div className="settings-scroll-container">{children}</div>
      </div>
    </div>
  );
};

export default memo(Sidebar);
