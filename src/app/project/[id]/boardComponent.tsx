'use client'
import React from 'react';
import {Plus} from "lucide-react";
import TaskCard, {BoardColumn} from "@/components/cards/taskCard";
import {moreDarkenColor, moreLightenColor} from "@/utility/utility";

const BoardComponent:React.FC<{ board: BoardColumn , onDropTask : (taskId: string, fromBoardId: string, toBoardId: string ,toIndex?:number) => void;}> = ({ board ,onDropTask}) => {

    const handleDrop = (e: React.DragEvent<HTMLDivElement>,targetIndex : number) => {
        e.preventDefault();
        const raw = e.dataTransfer.getData("application/json");
        if (!raw) return;

        try {
            const { taskId, fromBoardId } = JSON.parse(raw);
            if (!taskId || !fromBoardId) return;

            onDropTask(taskId, fromBoardId, board.id , targetIndex);
        } catch {
        }
    };
    return (
        <div style={{
            backgroundColor : board.color
        }} className="flex-shrink-0 w-72 rounded-xl flex flex-col p-2"
             onDragOver={(e) => e.preventDefault()}
             onDrop={(e) => handleDrop(e, board.tasks.length)}
        >
            <div style={{
                backgroundColor : moreDarkenColor(board.color , 5)
            }} className="px-3 py-2 space-x-2 flex items-center rounded-full w-fit">
                <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: moreLightenColor(board.color , 10) }}
                />
                <p className="text-xs font-semibold text-white">{board.name}</p>
                <span className="text-[11px] text-gray-300">
                    {board.tasks.length}
                </span>
            </div>

            <div className="pt-2 space-y-2 min-h-[40px]">
                {board.tasks.map((task, index) => (
                    <div
                        key={task.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(e, index)}
                    >
                        <TaskCard
                            task={task}
                            color={moreLightenColor(board.color, 10)}
                            boardId={board.id}
                        />
                    </div>
                ))}

                <div
                    className="h-4"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, board.tasks.length)}
                />
            </div>

            <button style={{
                borderColor : moreLightenColor(board.color , 10),
            }} className={`border border-dashed cursor-pointer hover:backdrop-brightness-110 mt-2 inline-flex items-center justify-center gap-1 rounded-lg p-2 text-[11px] text-white transition`}>
                <Plus size={14} />
                새 카드 추가
            </button>
        </div>
    );
};

export default BoardComponent;