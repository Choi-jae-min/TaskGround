'use client'
import React, {useState} from 'react';
import {Plus} from "lucide-react";
import TaskCard, {BoardColumn} from "@/components/cards/taskCard";
import {moreDarkenColor, moreLightenColor} from "@/utility/utility";

const BoardComponent:React.FC<{ board: BoardColumn , handleBoardData: (fromBoardId :string,toBoardId :string, taskId:string, index : string) => void}> = ({ board,handleBoardData}) => {
    const [taskHoverId , setTaskHoverId] = useState<string | "END" |null>(null);
    const [toBoardId , setToBoardId] = useState<string | null>(null);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setTaskHoverId(null)
        const raw = e.dataTransfer.getData("application/json");
        if (!raw) return;

        try {
            const { taskId, fromBoardId } = JSON.parse(raw);
            if (!taskId || !fromBoardId || !toBoardId || !taskHoverId) return;
            handleBoardData(fromBoardId , toBoardId ,taskId,taskHoverId)
        } catch {
        }
    };

    return (
        <div style={{backgroundColor : board.color}} className="flex-shrink-0 w-72 rounded-xl flex flex-col p-2 h-fit"
             onDragOver={(e) => {
                 e.preventDefault();
                 setToBoardId(board.id)
             }}
             onDrop={(e) => handleDrop(e)}
             onDragLeave={() => {
                 setTaskHoverId(null);
                 setToBoardId(null)
             }}
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
                    {board.task?board.task.length : 0}
                </span>
            </div>

            <div
                className="pt-2 space-y-2 min-h-[20px]">
                {board.task && board.task.map((task) => (
                    <div
                        key={task.id}
                        onDragOver={(e) => {
                            e.preventDefault();
                            setTaskHoverId(task.id);
                        }}
                    >
                        {task.id === taskHoverId && <div className="h-10 rounded-lg border-2 border-dashed border-white/40 my-1" />}
                        <TaskCard
                            task={task}
                            color={moreLightenColor(board.color, 10)}
                            boardId={board.id}
                        />
                    </div>
                ))}
            </div>
            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setTaskHoverId("END");
                }}
            >
                {taskHoverId === "END" && <div className="h-10 rounded-lg border-2 border-dashed border-white/40 my-1" />}

                <button style={{
                    borderColor : moreLightenColor(board.color , 10),
                }} className={`w-full mt-2 border border-dashed cursor-pointer hover:backdrop-brightness-110 inline-flex items-center justify-center gap-1 rounded-lg p-2 text-[11px] text-white transition`}>
                    <Plus size={14} />
                    새 카드 추가
                </button>
            </div>
        </div>
    );
};

export default BoardComponent;