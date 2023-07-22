"use client";

import React from "react";

export const DialogContext = React.createContext(
  {} as { open: boolean; toggle: () => void },
);

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  function toggle() {
    setOpen((state) => !state);
  }

  return (
    <DialogContext.Provider value={{ open, toggle }}>
      {children}
    </DialogContext.Provider>
  );
}
