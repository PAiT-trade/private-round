"use client";
import * as React from "react";
import { LoadingProvider } from "./context/loading-context";
import LoadingOverlay from "./components/LoadingOverlay";
import StyledComponentsRegistry from "./lib/style-registry";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <StyledComponentsRegistry>
      <LoadingProvider>
        {children}
        <LoadingOverlay />
      </LoadingProvider>
    </StyledComponentsRegistry>
  );
};
