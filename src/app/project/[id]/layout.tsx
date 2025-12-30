import React from 'react';
import Sidebar from "@/components/layout/sidebar";
import ProjectHeader from "@/components/headers/projectHeader";
import {redirect} from "next/navigation";
import {ProjectProvider} from "@/app/project/[id]/BoardContext";
import ProjectSidebar from "@/components/layout/projectSidebar";

export default async function ProjectLayout({children,params}: { children: React.ReactNode; params: { id: string }; }) {
    const { id } = await params;
    if( !id ) return redirect('/error')
    const getProjectRes = await fetch(`${process.env.NEXT_PUBLIC_WORKSPACE_SERVER_URL}/project/${id}`)
    if (!getProjectRes.ok) {
        return (
            <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 px-8 py-6 shadow-lg">
                    <h1 className="text-xl font-semibold">프로젝트를 불러올 수 없어요.</h1>
                    <p className="mt-2 text-sm text-slate-400">
                        잠시 후 다시 시도해 주세요. (status: {getProjectRes.status})
                    </p>
                </div>
            </div>
        );
    }
    const project = await getProjectRes.json()
    return (
        <ProjectProvider value={project}>
            <div className="flex h-screen bg-slate-950 text-white">
                {/*<Sidebar />*/}
                <ProjectSidebar/>
                <div className="flex flex-1 flex-col min-w-0">
                    <div className="flex-none px-6 py-6 border-b border-slate-800">
                        <ProjectHeader name={project.name} description={project.description}/>
                    </div>

                    <main className="flex-1 overflow-auto mr-4">
                        {children}
                    </main>
                </div>
            </div>
        </ProjectProvider>
    );
};

