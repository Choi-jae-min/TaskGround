'use client'
import React from 'react';
import {useWorkspace} from "@/app/workspace/[id]/WorkspaceContext";
import {formatDate} from "@/utility/utility";
import ProjectCard from "@/components/cards/projectCard";

const WorkSpaceForm = () => {
    const workspace = useWorkspace();
    const projectCount = workspace.projects?.length ?? 0;
    return (
        <div>
            <div className="mx-auto flex flex-col gap-8 px-6 py-10 lg:px-8">
                <section className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-sm">
                        <p className="text-xs text-slate-400">프로젝트 수</p>
                        <p className="mt-2 text-3xl font-semibold">{projectCount}</p>
                        <p className="mt-1 text-xs text-slate-500">
                            이 워크스페이스에 연결된 프로젝트 개수
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-sm">
                        <p className="text-xs text-slate-400">소유자</p>
                        <p className="mt-2 font-mono text-sm">{workspace.ownerId}</p>
                        <p className="mt-1 text-xs text-slate-500">
                            추후 유저 정보와 연결해서 표시할 수 있어요.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-sm">
                        <p className="text-xs text-slate-400">메타 정보</p>
                        <ul className="mt-2 space-y-1.5 text-xs text-slate-300">
                            <li>• 생성: {formatDate(workspace.createdAt)}</li>
                            <li>• 수정: {formatDate(workspace.updatedAt)}</li>
                            <li>• ID: {workspace.id.slice(0, 4)}…{workspace.id.slice(-4)}</li>
                        </ul>
                    </div>
                </section>

                {/* 프로젝트 리스트 영역 */}
                <section className="mt-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-slate-100">프로젝트</h2>
                        <button className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-200 hover:border-slate-600 hover:bg-slate-900 transition">
                            프로젝트 추가
                        </button>
                    </div>

                    {projectCount !== 0 ? (
                        <div className="mt-4 rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 px-6 py-10 text-center">
                            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900">
                                <span className="text-lg">📂</span>
                            </div>
                            <p className="text-sm font-medium text-slate-100">
                                아직 등록된 프로젝트가 없어요.
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                                새 프로젝트를 만들어 워크스페이스에서 작업을 시작해보세요.
                            </p>
                            <button className="mt-4 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition">
                                첫 프로젝트 만들기
                            </button>
                        </div>
                    ) : (
                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                            {/*{workspace.projects.map((project) => (*/}
                            <ProjectCard name="Project A" />
                            <ProjectCard name="Project A" />
                             {/*))}*/}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default WorkSpaceForm;