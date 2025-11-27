"use client";

import { createContext, useContext } from "react";

export type Workspace = {
    id: string;
    name: string;
    description: string;
    ownerId: string;
    createdAt: string;
    updatedAt: string;
    projects: never[];
};

const WorkspaceContext = createContext<Workspace | null>(null);

export function WorkspaceProvider({
                                      value,
                                      children,
                                  }: {
    value: Workspace;
    children: React.ReactNode;
}) {
    return (
        <WorkspaceContext.Provider value={value}>
            {children}
        </WorkspaceContext.Provider>
    );
}

export function useWorkspace() {
    const ctx = useContext(WorkspaceContext);
    if (!ctx) {
        throw new Error("useWorkspace는 WorkspaceProvider 안에서만 사용해야 합니다.");
    }
    return ctx;
}
