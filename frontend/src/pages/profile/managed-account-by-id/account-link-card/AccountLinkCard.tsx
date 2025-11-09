import Card from "../../../../components/card/Card.tsx";
import Button from "../../../../components/button/Button.tsx";

interface AccountLinkCardProps {
  platformName: string;
  isConnected: boolean;
  onClickConnect: () => void;
  onClickDisconnect: () => void;
}

const AccountLinkCard = (props: AccountLinkCardProps) => {
  const { platformName, isConnected, onClickConnect, onClickDisconnect } = props;

  if (isConnected) {
    return (
      <Card className="platform-account-item">
        <h4>{platformName}</h4>
        <div className="platform-account-item-btn btn-wrapper">
          <Button variant="danger" onClick={onClickDisconnect}>Disconnect</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="platform-account-item">
      <h4>{platformName}</h4>
      <div className="platform-account-item-btn btn-wrapper">
        <Button onClick={onClickConnect}>Connect</Button>
      </div>
    </Card>
  );
}

export default AccountLinkCard;
