import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";

interface IModalDialog {
  titleButton: string;
  children: React.ReactNode | null;
  is_button?: boolean;
  is_show?: boolean;
}
export const ModalDialog = ({
  children,
  titleButton,
  is_button = false,
  is_show = true,
}: IModalDialog) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={is_button}
          className="px-10 py-6 text-base bg-orange-600 text-white"
          variant="outline"
        >
          {titleButton}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">{children}</DialogContent>
    </Dialog>
  );
};
