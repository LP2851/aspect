import "./UserStats.css";

import {
  type User,
  useUserStatisticsReportQuery,
} from "../../../generated/graphql.ts";
import Select from "../../../components/input/select/Select.tsx";
import {useState} from "react";

interface UserStatsProps {
  user: User | null;
}

const UserStats = ({ user }: UserStatsProps) => {
  const userId = user?.id || "";

  const [selectedAccount, setSelectedAccount] = useState<string>("");

  const { data } = useUserStatisticsReportQuery({
    variables: {
      userId,
      managedAccountInput: {
        id: (selectedAccount ? { equals: selectedAccount } : undefined),
        user: { id: { equals: userId } },
      },
    },
  });

  return (
    <div className="account-links-section">
      <div className="stats-header-section">
        <h2>Projects</h2>

        <Select
          id="account-select"
          label="Select Account"
          value={selectedAccount}
          defaultOption="All Accounts"
          defaultValue=""
          onChange={(e) => setSelectedAccount(e.target.value)}
          required={false}
          options={[
            ...(user?.managedAccounts?.map(acc => {
              return {
                label: acc.name || "",
                value: acc.id || "",
              }
            }) || []),
          ]} />
      </div>

      <div className="stats-section">
        <div className="basic-stat-item">
          <h3>Total Active Projects</h3>
          <p>{data?.userActiveProjectsCount || 0}</p>
        </div>

        <div className="basic-stat-item">
          <h3>Total Projects Created</h3>
          <p>{data?.createdProjectsCount || 0}</p>
        </div>
      </div>

      <h2>Current Tasks</h2>
      <div className="stats-section">
        <div className="basic-stat-item">
          <h3>Total Active Tasks</h3>
          <p>{data?.activeTasksCount || 0}</p>
        </div>

        <div className="basic-stat-item">
          <h3>Total Failed Tasks</h3>
          <p className={(data?.failedTasksCount || 0) > 0 ? "red" : ""}>
            {data?.failedTasksCount || 0}
          </p>
        </div>

        <div className="basic-stat-item">
          <h3>Total Completed Tasks</h3>
          <p className={(data?.completedTasksCount || 0) > 0 ? "green" : ""}>
            {data?.completedTasksCount || 0}
          </p>
        </div>

        <div className="basic-stat-item">
          <h3>Total Tasks</h3>
          <p>{data?.totalTasksCount || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
