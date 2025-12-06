import React from 'react';

type Task = {
    id: string;
    title: string;
    description?: string;
    tag?: string;
    assignee?: string;
    dueDate?: string;
};

export type BoardColumn = {
    id: string;
    name: string;
    color: string;
    tasks: Task[];
};

const TaskCard: React.FC<{ task: Task, color : string }> = ({ task , color}) => {
    return (
        <div style={{
            backgroundColor : color
        }} className="rounded-lg p-3 shadow-sm hover:shadow-md transition cursor-pointer text-xs space-y-2">
            <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-white text-[13px]">{task.title}</p>
            </div>

            {task.description && (
                <p className="text-[11px] text-gray-300 line-clamp-2">
                    {task.description}
                </p>
            )}

            <div className="flex items-center justify-between gap-2 mt-1">
                <div className="flex items-center gap-1">
                    {task.tag && (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600">
              {task.tag}
            </span>
                    )}
                    {task.dueDate && (
                        <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-[10px] text-red-500">
              {task.dueDate}
            </span>
                    )}
                </div>

                {task.assignee && (
                    <div className="w-6 h-6 rounded-full bg-slate-500 flex items-center justify-center text-[10px] font-semibold text-white">
                        {task.assignee}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskCard;