import React from "react";
import WorkspaceRegForm from "@/app/workspace/register/workspaceRegForm";

export default function Page() {
    return (
        <div className="min-h-[calc(100vh-56px)] flex items-center justify-center p-6">
            <div className="w-full max-w-md border rounded-xl shadow-sm p-6">
                <h1 className="text-2xl font-bold ">새 워크스페이스 생성</h1>
                <p className=" mt-1 text-sm">
                    팀과 협업할 새로운 워크스페이스를 만들어보세요.
                </p>

                <WorkspaceRegForm/>
            </div>
        </div>
    );
}
