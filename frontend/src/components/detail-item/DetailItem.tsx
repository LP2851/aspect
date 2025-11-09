import "./DetailItem.css";

import { memo } from "react";

interface DetailItemProps {
  isPositive: boolean;
  headerText: string;
  statusText: string;
  descriptionText: string;
}

const DetailItem = ({
  isPositive,
  headerText,
  statusText,
  descriptionText,
}: DetailItemProps) => {
  return (
    <div
      className={`general-detail-item ${isPositive ? "connected" : "not-connected"}`}
    >
      <div className="general-detail-item-header">
        <span className="general-detail-item-header-item">{headerText}</span>
      </div>

      <div>
        <div className="connected-status">
          <div className="connected-info">
            <div className="connected-badge">
              {isPositive && (
                <>
                  <span className="connected-icon">✓</span>
                  <span className="connected-text">{statusText}</span>
                </>
              )}
              {!isPositive && (
                <>
                  <span className="connected-icon not-connected">×</span>
                  <span className="connected-text not-connected">
                    {statusText}
                  </span>
                </>
              )}
            </div>
            <span className="connected-description">{descriptionText}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(DetailItem);
