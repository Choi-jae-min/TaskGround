'use client'
import React from 'react';
import {formatDate} from "@/utility/utility";
import {Workspace} from "@/app/workspace/[id]/WorkspaceContext";

interface Props{
    workspace : Workspace
}

const WorkSpaceHeader = ({ workspace }: Props) => {
    return (
        <header className="space-y-4">
            <div className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1 text-xs font-medium text-slate-300">
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                워크스페이스 대시보드
            </div>

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        {workspace.name}
                    </h1>
                    <p className="mt-2 max-w-xl text-sm text-slate-300">
                        {workspace.description || "설명이 등록되지 않은 워크스페이스입니다."}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-400">
                                    <span className="rounded-full bg-slate-900/70 px-3 py-1">
                                      ID: <span className="font-mono">{workspace.id.slice(0, 8)}...</span>
                                    </span>
                        <span className="rounded-full bg-slate-900/70 px-3 py-1">
                                      생성일: {formatDate(workspace.createdAt)}
                                    </span>
                        <span className="rounded-full bg-slate-900/70 px-3 py-1">
                                      최근 업데이트: {formatDate(workspace.updatedAt)}
                                    </span>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button className="rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-900 transition">
                        워크스페이스 설정
                    </button>
                    <button className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md hover:bg-emerald-400 transition">
                        새 프로젝트 만들기
                    </button>
                </div>
            </div>
        </header>
    );
};

export default WorkSpaceHeader;