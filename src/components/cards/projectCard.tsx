"use client";

import React from "react";

interface ProjectCardProps {
    name: string;
    description?: string;
    color?: string;
    createdAt: string;
    updatedAt?: string;
    onClick?: () => void;
}

const ProjectCard = ({
                         name,
                         color = "#8B5CF6",
                         createdAt,
                     }: ProjectCardProps) => {
    return (
        <div>
            <div
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 hover:border-emerald-500/70 hover:bg-slate-900 transition mt-2.5"
            >
                <div className={'flex items-center space-x-4'}>
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: color }}
                    >
                        {name.charAt(0).toUpperCase()}
                    </div>

                    <h3 className="text-lg font-semibold text-slate-50">
                        {name}
                    </h3>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                    <span>생성:{createdAt}</span>
                    <button className="rounded-lg bg-slate-800/80 px-2 py-1 text-[11px] text-slate-100 hover:bg-slate-700">
                        상세 보기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
