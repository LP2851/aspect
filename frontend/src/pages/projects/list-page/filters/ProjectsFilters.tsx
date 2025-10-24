import "./ProjectsFilters.css";

import {memo, useCallback, useEffect, useState} from "react";
import { FaFilter } from "react-icons/fa";

import CheckboxList from "../../../../components/input/checkbox-list/CheckboxList.tsx";
import TextInput from "../../../../components/input/text/TextInput.tsx";
import { isFeatureFiltersEnabled } from "../../../../utils/features.ts";
import {useGetManagedAccountsQuery} from "../../../../generated/graphql.ts";
import {useSearchParams} from "react-router";
import {useAuth} from "../../../../auth/AuthProvider.tsx";

const ProjectsFilters = () => {
  const { user } = useAuth();
  const [params] = useSearchParams();

  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    "youtube",
    "tiktok",
    "instagram",
    "facebook",
    "x",
  ]);
  const [isMinimized, setIsMinimized] = useState<boolean>(true);
  const [accounts, setAccounts] = useState<string[]>([]);

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

  const handlePlatformChange = useCallback((checkedValues: string[]) => {
    setSelectedPlatforms(checkedValues);
  }, []);

  const handleAccountsChange = useCallback((checkedValues: string[]) => {
    setAccounts(checkedValues);
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
            { !!data && !!data.managedAccounts &&
                <CheckboxList
                    id="managed-accounts"
                    label="Managed Account"
                    checkboxes={data.managedAccounts.map((ma) => ({
                      id: ma.id,
                      label: ma.name || "",
                      value: ma.id,
                      name: ma.name || "",
                      checked: accounts.includes(ma.id),
                    })) ?? []}
                    onChange={handleAccountsChange}
                />
            }
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

          <div className="projects-filters-container-inner">
            <TextInput placeholder="Search..." label="Search" />
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(ProjectsFilters);
