import { useCallback, useState } from "react";

type useSplitterReturns = {
  explorerWidth: number;
  handleExplorerMouseDown: (event: React.MouseEvent) => void;
  handleDragable: (event: React.MouseEvent) => void;
};

export function useSplitter(): useSplitterReturns {
  const [explorerWidth, setExplorerWidth] = useState<number>(300);

  const handleDragable = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
  }, []);

  const handleExplorerMouseDown = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    document.addEventListener("mousemove", handleExplorerMouseMove);
    document.addEventListener("mouseup", handleExplorerMouseUp);
  }, []);

  const handleExplorerMouseMove = useCallback((event: MouseEvent) => {
    event.preventDefault();
    setExplorerWidth((pre) => pre + event.movementX);
  }, []);

  const handleExplorerMouseUp = useCallback((event: MouseEvent) => {
    event.preventDefault();
    document.removeEventListener("mousemove", handleExplorerMouseMove);
    document.removeEventListener("mouseup", handleExplorerMouseUp);
  }, []);

  return { explorerWidth, handleExplorerMouseDown, handleDragable };
}
