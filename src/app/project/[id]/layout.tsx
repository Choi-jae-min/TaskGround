import React from 'react';
import Sidebar from "@/components/layout/sidebar";
import ProjectHeader from "@/components/headers/projectHeader";

export default async function ProjectLayout({children,params}: { children: React.ReactNode; params: { id: string }; }) {
    const { id } = await params;
    console.log(id)
    return (
        <div className="flex h-screen bg-slate-950 text-white">
            <Sidebar />
            <div className="flex flex-1 flex-col min-w-0">
                <div className="flex-none px-6 pt-6 pb-4 border-b border-slate-800">
                    <ProjectHeader />
                </div>

                <main className="flex-1 overflow-auto mr-4">
                    {children}
                </main>
            </div>
        </div>
    );
};

