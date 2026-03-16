import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  showModal: boolean;
}

const ConfirmModal = ({ message, onConfirm, onCancel, showModal }: Props) => {
  return (
    <Dialog open={showModal} onOpenChange={onCancel}>
      <DialogContent className="bg-white">

        <DialogHeader>
          {/* Modal Message */}
          <DialogTitle>{message}</DialogTitle>
        </DialogHeader>

        {/* Buttons with spacing */}
        <div className="flex justify-end gap-3 mt-6">
          <Button
            onClick={onConfirm}
            variant="secondary"
            className="bg-green-500 text-white hover:bg-green-600"
          >
            Yes
          </Button>

          <Button onClick={onCancel} variant="outline">
            Cancel
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
