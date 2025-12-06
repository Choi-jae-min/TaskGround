import React from 'react';

const ProjectHeader = () => {
    return (
        <header className="flex items-center justify-between gap-4">
            <div>
                <p className="text-xs">프로젝트</p>
                <h1 className="text-xl md:text-2xl font-bold">
                    projectName
                </h1>
                <p className="mt-1 text-xs md:text-sm">projectDesc</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
                <button className="rounded-md border border-slate-800 px-3 py-1.5 hover:border-slate-700">
                    보드 추가
                </button>
                <button className="rounded-md border border-slate-800 px-3 py-1.5 hover:border-slate-700">
                    멤버 관리
                </button>
                <button className="rounded-md bg-[#8B5CF6] text-white px-3 py-1.5 hover:bg-[#7C3AED]">
                    새 카드 만들기
                </button>
            </div>
        </header>
    );
};

export default ProjectHeader;