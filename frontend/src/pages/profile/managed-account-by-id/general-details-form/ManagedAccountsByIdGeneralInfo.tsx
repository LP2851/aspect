import {memo} from "react";
import TextInput from "../../../../components/input/text/TextInput.tsx";
import TextAreaInput from "../../../../components/input/textarea/TextAreaInput.tsx";
import Button from "../../../../components/button/Button.tsx";

interface ManagedAccount {
  id: string;
  name: string;
  description: string;
}

interface ManagedAccountByIdGeneralInfoProps {
  account: ManagedAccount;
  setAccount: (account: ManagedAccount) => void;
  onSave: () => void;
}

const ManagedAccountsByIdGeneralInfo = (props: ManagedAccountByIdGeneralInfoProps) => {
  const { account, setAccount, onSave } = props;

  return (
    <form>
      <div className="form-group">
        <TextInput
          label="Name"
          placeholder="Enter a name"
          value={account.name}
          required={true}
          onChange={(e) => setAccount({ ...account, name: e.target.value })}
        />
      </div>

      <div className="form-group">
        <TextAreaInput
          label="Description"
          placeholder="Enter a description"
          value={account.description}
          required={true}
          onChange={(e) => setAccount({ ...account, description: e.target.value })}
        />
      </div>

      <div className="form-group btn-wrapper">
        <Button type="submit" onClick={onSave}>Save changes</Button>
      </div>
    </form>
  );
}

export default memo(ManagedAccountsByIdGeneralInfo);
