import {memo} from "react";
import "./ManagedAccountsPage.css";
import Card from "../../components/card/Card.tsx";
import {useAuth} from "../../auth/AuthProvider.tsx";
import {Tag} from "../../components/tag/Tag.tsx";
import {FaArrowCircleRight, FaCogs, FaYoutube} from "react-icons/fa";
import {useGetManagedAccountsQuery} from "../../generated/graphql.ts";
import {useNavigate} from "react-router";

const iconStyle = { paddingRight: "8px", height: "24px" };

const ManagedAccountsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data, loading, error } = useGetManagedAccountsQuery({
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="managed-accounts-page">
      <div className="managed-accounts-container">
        <h1>Managed Accounts</h1>
        <p className="description">Welcome {user?.name}. You manage multiple social media accounts. Select the account you wish to edit.</p>

        <div className="managed-accounts-list">

          { data?.managedAccounts?.map((account) => (
            <Card className="managed-account-card">
              <div className="managed-account-card-body" onClick={() => {navigate("/projects?managedAccounts=" + account.id)}}>
                <div className="managed-account-card-header">
                  <h2>{account.name}</h2>
                  <FaCogs className="managed-account-card-icon-cogs" onClick={(e) => {
                    e.stopPropagation();
                    navigate("/profile?element=managed-account_" + account.id);
                  }} />
                </div>
                <p>{account.description}</p>

                <div>
                  { account.managedAccountLinks?.map((link) => (
                    <Tag children={<FaYoutube style={iconStyle} />}
                         label={link.accountName || account.name || ""}
                         color="purple"
                    />
                  ))}
                </div>

                <div className="managed-account-card-footer">
                  <FaArrowCircleRight className="managed-account-card-icon" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(ManagedAccountsPage);
