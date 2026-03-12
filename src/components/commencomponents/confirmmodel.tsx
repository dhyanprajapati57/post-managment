import Button from "./button";
import "../../assets/confirmmodal.css";

interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({ message, onConfirm, onCancel }: Props) => {
  return (
    <div className="confirm-overlay">
      <div className="confirm-box">

        <p className="confirm-message">{message}</p>

        <div className="confirm-actions">
          <Button label="Yes" onClick={onConfirm} />
          <Button label="Cancel" onClick={onCancel} />
        </div>

      </div>
    </div>
  );
};

export default ConfirmModal;