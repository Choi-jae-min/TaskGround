import Sidebar from "@/components/layout/sidebar";
import React from "react";
import {WorkspaceProvider} from "@/app/workspace/[id]/WorkspaceContext";
import WorkSpaceHeader from "@/components/headers/workSpaceHeader";

export default async function WorkspaceLayout({children,params}: { children: React.ReactNode; params: { id: string }; }) {
    const { id } = await params;

    const getWorkSpaceRes = await fetch(`${process.env.WORKSPACE_SERVER_URL}/workspace/${id}`)
    if (!getWorkSpaceRes.ok) {
        return (
            <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 px-8 py-6 shadow-lg">
                    <h1 className="text-xl font-semibold">워크스페이스를 불러올 수 없어요.</h1>
                    <p className="mt-2 text-sm text-slate-400">
                        잠시 후 다시 시도해 주세요. (status: {getWorkSpaceRes.status})
                    </p>
                </div>
            </div>
        );
    }
    const workspace = await getWorkSpaceRes.json()
    return (
        <WorkspaceProvider value={workspace}>
            <div className="w-full h-screen flex bg-[#191919] text-white">
                <Sidebar />

                <div className="flex flex-col flex-1 bg-slate-950 text-slate-50">
                    <div className="flex-none px-6 pt-6 pb-4 border-b border-slate-800">
                        <WorkSpaceHeader workspace={workspace} />
                    </div>
                    <main className="flex-1 overflow-y-auto px-6 pb-6">
                        {children}
                    </main>
                </div>
            </div>
        </WorkspaceProvider>
    );
}
