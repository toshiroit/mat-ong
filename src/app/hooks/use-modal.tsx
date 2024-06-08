"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
interface IUseModal {
  onOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}
export const UseModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog>
      <DialogTrigger asChild>124124</DialogTrigger>
    </Dialog>
  );
};
