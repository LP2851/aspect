import "./ProjectsFilters.css";

import { memo, useCallback, useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";

import CheckboxList from "../../../../components/input/checkbox-list/CheckboxList.tsx";
import { isFeatureFiltersEnabled } from "../../../../utils/features.ts";
import { useGetManagedAccountsQuery } from "../../../../generated/graphql.ts";
import { useSearchParams } from "react-router";
import { useAuth } from "../../../../auth/AuthProvider.tsx";

const ProjectsFilters = () => {
  const { user } = useAuth();
  const [params, setParams] = useSearchParams();

  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(() => {
    const platformsParam = params.get("platforms");
    return platformsParam ? platformsParam.split(",") : [];
  });
  const [selectedTypes, setSelectedTypes] = useState<string[]>(() => {
    const typesParam = params.get("types");
    return typesParam
      ? typesParam.split(",")
      : ["text", "image", "video", "multi-media"];
  });

  const [isMinimized, setIsMinimized] = useState<boolean>(() => {
    const saved = localStorage.getItem("projects-filters-minimized");
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [accounts, setAccounts] = useState<string[]>([]);

  const updateSearchParams = useCallback(
    (key: string, values: string[]) => {
      const newParams = new URLSearchParams(params);
      if (values.length > 0) {
        newParams.set(key, values.join(","));
      } else {
        newParams.delete(key);
      }
      setParams(newParams);
    },
    [params, setParams],
  );

  const { data } = useGetManagedAccountsQuery({
    variables: {
      where: {
        user: {
          id: {
            equals: user?.id,
          },
        },
      },
      skip: 0,
      take: 100,
    },
  });

  useEffect(() => {
    const managedAccounts = params.get("managedAccounts") || "";
    if (managedAccounts) {
      setAccounts([...managedAccounts.split(",")]);
    } else {
      setAccounts(data?.managedAccounts?.map((ma) => ma.id) ?? []);
    }
  }, [data]);

  const handlePlatformChange = useCallback(
    (checkedValues: string[]) => {
      setSelectedPlatforms(checkedValues);
      updateSearchParams("platforms", checkedValues);
    },
    [updateSearchParams],
  );

  const handleAccountsChange = useCallback(
    (checkedValues: string[]) => {
      setAccounts(checkedValues);
      updateSearchParams("managedAccounts", checkedValues);
    },
    [updateSearchParams],
  );

  const handleTypeChange = useCallback(
    (checkedValues: string[]) => {
      setSelectedTypes(checkedValues);
      updateSearchParams("types", checkedValues);
    },
    [updateSearchParams],
  );

  const toggleMinimized = useCallback(() => {
    setIsMinimized((prev) => {
      const newValue = !prev;
      localStorage.setItem(
        "projects-filters-minimized",
        JSON.stringify(newValue),
      );
      return newValue;
    });
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
            {!!data && !!data.managedAccounts && (
              <CheckboxList
                id="managed-accounts"
                label="Managed Account"
                checkboxes={
                  data.managedAccounts.map((ma) => ({
                    id: ma.id,
                    label: ma.name || "",
                    value: ma.id,
                    name: ma.name || "",
                    checked: accounts.includes(ma.id),
                  })) ?? []
                }
                onChange={handleAccountsChange}
              />
            )}
          </div>

          <div className="projects-filters-container-inner">
            <CheckboxList
              id="project-type"
              label="Project Type"
              checkboxes={[
                {
                  id: "text",
                  label: "Text",
                  value: "text",
                  name: "text",
                  checked: selectedTypes.includes("text"),
                },
                {
                  id: "image",
                  label: "Image",
                  value: "image",
                  name: "image",
                  checked: selectedTypes.includes("image"),
                },
                {
                  id: "video",
                  label: "Video",
                  value: "video",
                  name: "video",
                  checked: selectedTypes.includes("video"),
                },
                {
                  id: "multi-media",
                  label: "Multi-Media",
                  value: "multi-media",
                  name: "multi-media",
                  checked: selectedTypes.includes("multi-media"),
                },
              ]}
              onChange={handleTypeChange}
            />
          </div>

          <div className="projects-filters-container-inner">
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

          {/*<div className="projects-filters-container-inner">*/}
          {/*  <TextInput placeholder="Search..." label="Search" />*/}
          {/*</div>*/}
        </div>
      )}
    </div>
  );
};

export default memo(ProjectsFilters);
