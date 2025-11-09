import type { ReactNode } from "react";

export interface SidebarContentMapping {
  key: string;
  element?: ReactNode;
  func?: () => void;
  itemName: string;
  subElementMapping?: SidebarContentMapping[];
  hidden: boolean;
}
