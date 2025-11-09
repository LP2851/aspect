import { memo, useState } from "react";
import {
  useCreateManagedAccountMutation,
  useDeleteManagedAccountMutation,
  useGetManagedAccountsQuery,
  useUpdateManagedAccountMutation,
} from "../../../generated/graphql.ts";
import { useAuth } from "../../../auth/AuthProvider.tsx";
import "./ManagedAccounts.css";
import Card from "../../../components/card/Card.tsx";
import Button from "../../../components/button/Button.tsx";
import Tag from "../../../components/tag/Tag.tsx";
import { FaYoutube } from "react-icons/fa";
import CreateManagedAccountModal from "../../../components/modal/create-managed-account/CreateManagedAccountModal.tsx";
import { useToast } from "../../../providers/toast/ToastProvider.tsx";

const ManagedAccounts = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModal, setIsCreateModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<any | null>(null);

  const { data, refetch } = useGetManagedAccountsQuery({
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

  const [createNewManagedAccount] = useCreateManagedAccountMutation();
  const [updateManagedAccount] = useUpdateManagedAccountMutation();
  const [deleteManagedAccount] = useDeleteManagedAccountMutation();

  const openModal = (isCreate: boolean) => {
    setIsModalOpen(true);
    setIsCreateModal(isCreate);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
    setSelectedAccount(null);
    setTimeout(refetch, 100);
  };

  const editAccount = async (account: any) => {
    setSelectedAccount(account);
    openModal(false);
  };

  const addLink = async (id: string) => {
    alert("Add link: " + id);
  };

  const createNewAccount = async (data: {
    id: string;
    name: string;
    description: string;
  }) => {
    const { data: res } = await createNewManagedAccount({
      variables: {
        data: {
          name: data.name,
          description: data.description,
          user: { connect: { id: user?.id } },
        },
      },
    });

    if (!res?.createManagedAccount?.id) {
      showToast("error", "Failed to create new managed account: " + data.name);
      return;
    }

    showToast(
      "success",
      "Successfully created new managed account: " + data.name,
    );
    onModalClose();
  };

  const updateAccount = async (data: {
    id: string;
    name: string;
    description: string;
  }) => {
    const { data: res } = await updateManagedAccount({
      variables: {
        where: { id: data.id },
        data: {
          name: data.name,
          description: data.description,
        },
      },
    });

    if (!res?.updateManagedAccount?.id) {
      showToast("error", "Failed to update managed account: " + data.name);
      return;
    }

    showToast("success", "Successfully update managed account: " + data.name);
    onModalClose();
  };

  const deleteAccount = async (id: string) => {
    const { data } = await deleteManagedAccount({
      variables: {
        where: { id },
      },
    });

    data?.deleteManagedAccount?.id &&
      showToast("success", "Successfully deleted managed account");
    setTimeout(refetch, 100);
  };

  return (
    <div className="managed-accounts-section scroll-container">
      <h2>Managed Accounts</h2>
      <p>Add and update accounts managed by this profile</p>

      <Button
        style={{ width: "100%", marginBottom: "2rem" }}
        onClick={() => openModal(true)}
      >
        Add New Account
      </Button>
      {data?.managedAccounts?.map((account) => (
        <Card className="managed-account-settings-card">
          <div className="managed-account-settings-card-header">
            <h3>{account.name}</h3>
            <div className="managed-account-settings-card-header-actions">
              <Button
                variant="danger"
                onClick={async () => await deleteAccount(account.id)}
              >
                Remove
              </Button>
              <Button
                variant="secondary"
                onClick={async () => await editAccount(account)}
              >
                Edit
              </Button>
              <Button onClick={async () => await addLink(account.id)}>
                Add Link
              </Button>
            </div>
          </div>

          <div className="managed-account-settings-card-body">
            <p>
              Description:{" "}
              <span className="description">{account.description}</span>
            </p>

            <p>
              Linked accounts:
              {account.managedAccountLinks?.map((link) => (
                <Tag
                  children={
                    <FaYoutube
                      style={{ paddingRight: "8px", height: "24px" }}
                    />
                  }
                  label={link.accountName || account.name || ""}
                  color="purple"
                />
              ))}
              {account.managedAccountLinks?.length === 0 && (
                <span className="description">
                  {" "}
                  No platform accounts linked.
                </span>
              )}
            </p>
          </div>
        </Card>
      ))}

      <CreateManagedAccountModal
        isOpen={isModalOpen}
        isCreate={isCreateModal}
        onClose={onModalClose}
        onSubmit={isCreateModal ? createNewAccount : updateAccount}
        isLoading={false}
        managedAccount={selectedAccount}
      />
    </div>
  );
};

export default memo(ManagedAccounts);
