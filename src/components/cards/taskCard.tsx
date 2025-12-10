'use client'
import React, {useState} from 'react';

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

const TaskCard: React.FC<{ task: Task, color : string ,boardId:string}> = ({ task , color, boardId }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData(
            "application/json",
            JSON.stringify({ taskId: task.id, fromBoardId: boardId })
        );
        e.dataTransfer.effectAllowed = "move";

        const node = e.currentTarget;
        const ghost = node.cloneNode(true) as HTMLElement;
        ghost.style.position = "absolute";
        ghost.style.top = "-9999px";
        ghost.style.left = "-9999px";
        ghost.style.opacity = "0.7";
        document.body.appendChild(ghost);
        e.dataTransfer.setDragImage(ghost, ghost.offsetWidth / 2, ghost.offsetHeight / 2);

        //dom 성능 저하방지를 위해 제거.
        setTimeout(() => {
            document.body.removeChild(ghost);
        }, 0);

        setIsDragging(true);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{
            backgroundColor : color
        }} className={`
        rounded-lg border border-slate-700 p-3 text-xs text-white cursor-grab active:cursor-grabbing
        select-none transition
        ${isDragging ? "opacity-40 scale-[0.98]" : "opacity-100"}
      `}>
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