interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({ message, onConfirm, onCancel }: Props) => {

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <div style={{ background: "white", padding: "20px" }}>

        <p>{message}</p>

        <button onClick={onConfirm}>Yes</button>

        <button onClick={onCancel}>Cancel</button>

      </div>

    </div>
  );
};

export default ConfirmModal;