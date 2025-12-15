import React, {FC} from 'react';
interface Props {
    name : string
    description?:string
}
const ProjectHeader:FC<Props> = ({name ,description}) => {
    return (
        <header className={'space-y-4'}>
            <div className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1 text-xs font-medium text-slate-300">
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                프로젝트 대시보드
            </div>
            <div className={'flex items-center justify-between gap-4'}>
                <div className={'flex flex-col'}>
                    <h1 className="text-xl md:text-2xl font-bold">
                        {name}
                    </h1>
                    <p className={'p-1 text-gray-400 text-14'}>{description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                    <button className="rounded-md bg-[#8B5CF6] text-white px-3 py-1.5 hover:bg-[#7C3AED]">
                        새 카드 만들기
                    </button>
                </div>
            </div>
        </header>
    );
};

export default ProjectHeader;