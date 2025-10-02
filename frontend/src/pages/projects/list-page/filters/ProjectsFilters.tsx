import "./ProjectsFilters.css";

import { memo, useCallback, useState } from "react";
import { FaFilter } from "react-icons/fa";

import CheckboxList from "../../../../components/input/checkbox-list/CheckboxList.tsx";
import TextInput from "../../../../components/input/text/TextInput.tsx";
import { isFeatureFiltersEnabled } from "../../../../utils/features.ts";

const ProjectsFilters = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    "youtube",
    "tiktok",
    "instagram",
    "facebook",
    "x",
  ]);
  const [isMinimized, setIsMinimized] = useState<boolean>(true);

  const handlePlatformChange = useCallback((checkedValues: string[]) => {
    setSelectedPlatforms(checkedValues);
    console.log("Selected platforms:", checkedValues);
  }, []);

  const toggleMinimized = useCallback(() => {
    setIsMinimized((prev) => !prev);
  }, []);

  if (!isFeatureFiltersEnabled()) {
    return <></>;
  }

  return (
    <div className="projects-filters-container">
      <div className="projects-filters-header-container">
        <h2>
          <FaFilter className="filter-title-icon" /> Filters
        </h2>
        <button
          className="filters-toggle-button"
          onClick={toggleMinimized}
          aria-label={isMinimized ? "Expand filters" : "Minimize filters"}
        >
          {isMinimized ? "+" : "-"}
        </button>
      </div>
      {!isMinimized && (
        <div className="projects-filters">
          <div className="projects-filters-container-inner">
            {/*<h3>Search</h3>*/}
            {/*<input type="text" placeholder="Search..." />*/}
            {/*<TextInput placeholder="Search..." label="Search" />*/}
            <CheckboxList
              id="upload-platforms"
              label="Upload Platforms"
              checkboxes={[
                {
                  id: "youtube",
                  label: "YouTube",
                  value: "youtube",
                  name: "youtube",
                  checked: selectedPlatforms.includes("youtube"),
                },
                {
                  id: "tiktok",
                  label: "TikTok",
                  value: "tiktok",
                  name: "tiktok",
                  checked: selectedPlatforms.includes("tiktok"),
                },
                {
                  id: "instagram",
                  label: "Instagram",
                  value: "instagram",
                  name: "instagram",
                  checked: selectedPlatforms.includes("instagram"),
                },
                {
                  id: "facebook",
                  label: "Facebook",
                  value: "facebook",
                  name: "facebook",
                  checked: selectedPlatforms.includes("facebook"),
                },
                {
                  id: "x",
                  label: "X",
                  value: "x",
                  name: "x",
                  checked: selectedPlatforms.includes("x"),
                },
              ]}
              onChange={handlePlatformChange}
            />
          </div>

          <div className="projects-filters-container-inner">
            <TextInput placeholder="Search..." label="Search" />
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(ProjectsFilters);
