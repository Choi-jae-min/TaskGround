"use client";

import { createContext, useContext } from "react";
export type Project = {
    id: string;
    name: string;
    createdAt : string;
    board : {
        id : string;
        name :string;
        color : string;
        task : {
           id : string;
            title : string
            description : string
            assignee : string
            tag ?: string
            dueDate : string
        }[]
    }[],
};

const ProjectContext = createContext<Project | null>(null);

export function ProjectProvider({value, children,}: {
    value: Project;
    children: React.ReactNode;
}) {
    return (
        <ProjectContext.Provider value={value}>
            {children}
        </ProjectContext.Provider>
    );
}

export function useProject() {
    const ctx = useContext(ProjectContext);
    if (!ctx) {
        throw new Error("useProject 는 ProjectProvider 안에서만 사용해야 합니다.");
    }
    return ctx;
}
