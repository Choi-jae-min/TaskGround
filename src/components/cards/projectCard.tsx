"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
    name: string;
    description?: string;
    color?: string;
    updatedAt?: string;
    onClick?: () => void;
}

const ProjectCard = ({
                         name,
                         description,
                         color = "#8B5CF6",
                         updatedAt = "",
                         onClick,
                     }: ProjectCardProps) => {
    return (
        <div>
            <div
                onClick={onClick}
                className="
            group
            border rounded-xl bg-white p-5 cursor-pointer
            hover:shadow-md
            hover:border-emerald-500/70  transition
          "
            >
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold mb-3"
                    style={{ backgroundColor: color }}
                >
                    {name.charAt(0).toUpperCase()}
                </div>

                <h2 className="text-lg font-semibold text-gray-800">{name}</h2>

                {description && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>
                )}

                <div className="flex items-center justify-between mt-4">
                    <p className="text-xs text-gray-400">
                        {updatedAt ? `업데이트: ${updatedAt}` : "프로젝트 준비중"}
                    </p>

                    <ArrowRight className="opacity-0 group-hover:opacity-100 transition" size={16} />
                </div>
            </div>

            <div
                // key={project.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 hover:border-emerald-500/70 hover:bg-slate-900 transition mt-2.5"
            >
                <h3 className="text-sm font-semibold text-slate-50">
                    {name}
                </h3>
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                    <span>생성: </span>
                    <button className="rounded-lg bg-slate-800/80 px-2 py-1 text-[11px] text-slate-100 hover:bg-slate-700">
                        상세 보기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
