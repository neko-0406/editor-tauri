import { useCallback, useState } from "react";

export type useDialogDisplayReturns = {
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
  openDialog: () => void;
  closeDialog: () => void;
};

export function useDialogDisplay(): useDialogDisplayReturns {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  return { isDialogOpen, setIsDialogOpen, openDialog, closeDialog };
}
