import { useEffect, useState } from "react";
import {
  useGetManagedAccountQuery,
  useYouTubeAuthUrlQuery,
} from "../../../generated/graphql.ts";
import Card from "../../../components/card/Card.tsx";
import "./ManagedAccountById.css";
import ManagedAccountsByIdGeneralInfo from "./general-details-form/ManagedAccountsByIdGeneralInfo.tsx";
import AccountLinkCard from "./account-link-card/AccountLinkCard.tsx";

interface ManagedAccountByIdProps {
  managedAccountId: string;
}

interface PlatformAccountLink {
  accountName: string;
  tokenFor: string;
}

interface ManagedAccount {
  id: string;
  name: string;
  description: string;
  managedAccountLinks?: PlatformAccountLink[];
}

const ManagedAccountById = ({ managedAccountId }: ManagedAccountByIdProps) => {
  const [account, setAccount] = useState<ManagedAccount>();

  const { data, loading } = useGetManagedAccountQuery({
    variables: { where: { id: managedAccountId } },
  });

  const { data: youtubeAuthData } = useYouTubeAuthUrlQuery();

  useEffect(() => {
    if (data?.managedAccount) {
      setAccount({
        id: data.managedAccount.id,
        name: data.managedAccount.name || "",
        description: data.managedAccount.description || "",
        managedAccountLinks: data.managedAccount.managedAccountLinks?.map(
          (acc) => {
            return {
              accountName: acc.accountName || "",
              tokenFor: acc.tokenFor || "",
            };
          },
        ),
      });
    }
  }, [data]);

  const handleYouTubeOAuth = async () => {
    window.location.href = youtubeAuthData?.youtubeAuthUrl || "";
  };

  if (loading || !account) {
    return <p>Loading...</p>;
  }

  return (
    <div className="managed-account-info-section scroll-container">
      <h2>Managed Account: {account.name}</h2>
      <p className="managed-account-info-section-description">
        Update the details of your managed account here. You can also connect
        your platform accounts to this account.
      </p>

      <Card className="managed-account-info-card">
        <h3>General</h3>
        <p className="section-description">
          General details about the managed account
        </p>

        <ManagedAccountsByIdGeneralInfo
          account={account}
          setAccount={setAccount}
          onSave={() => {}}
        />

        <div className="platform-accounts-section">
          <h3>Platform Accounts</h3>
          <p className="section-description">
            Connect your platform accounts to this account
          </p>

          <AccountLinkCard
            platformName="YouTube"
            onClickConnect={handleYouTubeOAuth}
            onClickDisconnect={() => {}}
            isConnected={
              account.managedAccountLinks?.some(
                (link) => link.tokenFor === "YOUTUBE",
              ) || false
            }
          />

          <AccountLinkCard
            platformName="X"
            onClickConnect={() => alert("Connect X")}
            onClickDisconnect={() => {}}
            isConnected={
              account.managedAccountLinks?.some(
                (link) => link.tokenFor === "X",
              ) || false
            }
          />

          <AccountLinkCard
            platformName="TikTok"
            onClickConnect={() => alert("Connect TikTok")}
            onClickDisconnect={() => {}}
            isConnected={
              account.managedAccountLinks?.some(
                (link) => link.tokenFor === "TIK_TOK",
              ) || false
            }
          />

          <AccountLinkCard
            platformName="Instagram"
            onClickConnect={() => alert("Connect Instagram")}
            onClickDisconnect={() => {}}
            isConnected={
              account.managedAccountLinks?.some(
                (link) => link.tokenFor === "INSTAGRAM",
              ) || false
            }
          />

          <AccountLinkCard
            platformName="Facebook"
            onClickConnect={() => alert("Connect Facebook")}
            onClickDisconnect={() => {}}
            isConnected={
              account.managedAccountLinks?.some(
                (link) => link.tokenFor === "FACEBOOK",
              ) || false
            }
          />
        </div>
      </Card>
    </div>
  );
};

export default ManagedAccountById;
