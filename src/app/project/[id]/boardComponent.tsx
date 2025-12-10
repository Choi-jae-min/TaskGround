'use client'
import React, {useState} from 'react';
import {Plus} from "lucide-react";
import TaskCard, {BoardColumn} from "@/components/cards/taskCard";
import {moreDarkenColor, moreLightenColor} from "@/utility/utility";

const BoardComponent:React.FC<{ board: BoardColumn}> = ({ board}) => {
    const [boardData , setBoardData] = useState(board)

    const [taskHoverId , setTaskHoverId] = useState<string | "END" |null>(null);
    const [toBoardId , setToBoardId] = useState<string | null>(null);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setTaskHoverId(null)
        const raw = e.dataTransfer.getData("application/json");
        if (!raw) return;

        try {
            const { taskId, fromBoardId ,task } = JSON.parse(raw);
            if (!taskId || !fromBoardId || !task) return;
            const tasks = [...board.tasks];

            if(boardData.id === fromBoardId){
                const fromIndex = tasks.findIndex(t => t.id === taskId);
                if (fromIndex === -1) return;

                let toIndex: number;

                if (taskHoverId === "END") {
                    toIndex = tasks.length - 1;
                } else {
                    toIndex = tasks.findIndex(t => t.id === taskHoverId);
                    if (toIndex === -1) return;
                }

                if (fromIndex === toIndex) return;

                const [movedTask] = tasks.splice(fromIndex, 1);
                tasks.splice(toIndex, 0, movedTask);

                const newBoard = {
                    ...board,
                    tasks,
                };
                setBoardData(newBoard)
            }else {
                if (boardData.id === fromBoardId) {
                    const tasks = [...boardData.tasks];

                    const deleteIndex = tasks.findIndex(t => t.id === taskId);
                    if (deleteIndex === -1) return;

                    tasks.splice(deleteIndex, 1);

                    const newBoard = {
                        ...boardData,
                        tasks,
                    };
                    console.log('delboard' ,newBoard)

                    setBoardData(newBoard);
                }

                if (boardData.id === toBoardId) {
                    const beforeTasks = boardData

                    const tasks = [...boardData.tasks];

                    let insertIndex: number;

                    if (taskHoverId === "END") {
                        insertIndex = tasks.length;
                    } else {
                        insertIndex = tasks.findIndex(t => t.id === taskHoverId);
                        if (insertIndex === -1) return;
                    }

                    tasks.splice(insertIndex, 0, task);

                    const newBoard = {
                        ...boardData,
                        tasks,
                    };

                    console.log('add board' ,newBoard)
                    setBoardData(newBoard);
                }

            }
        } catch {
        }
    };

    return (
        <div style={{backgroundColor : boardData.color}} className="flex-shrink-0 w-72 rounded-xl flex flex-col p-2"
             onDragOver={(e) => {
                 e.preventDefault();
                 setToBoardId(boardData.id)
             }}
             onDrop={(e) => handleDrop(e)}
             onDragLeave={() => {
                 setTaskHoverId(null);
                 setToBoardId(null)
             }}
        >
            <div style={{
                backgroundColor : moreDarkenColor(boardData.color , 5)
            }} className="px-3 py-2 space-x-2 flex items-center rounded-full w-fit">
                <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: moreLightenColor(boardData.color , 10) }}
                />
                <p className="text-xs font-semibold text-white">{boardData.name}</p>
                <span className="text-[11px] text-gray-300">
                    {boardData.tasks.length}
                </span>
            </div>

            <div
                className="pt-2 space-y-2 min-h-[40px]">
                {boardData.tasks.map((task) => (
                    <div
                        key={task.id}
                        onDragOver={(e) => {
                            e.preventDefault();
                            setTaskHoverId(task.id);
                        }}
                        onDrop={(e) => handleDrop(e)}
                    >
                        {task.id === taskHoverId && <div className="h-10 rounded-lg border-2 border-dashed border-white/40 my-1" />}
                        <TaskCard
                            task={task}
                            color={moreLightenColor(boardData.color, 10)}
                            boardId={boardData.id}
                        />
                    </div>
                ))}
            </div>
            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setTaskHoverId("END");
                }}
                onDrop={handleDrop}
            >
                {taskHoverId === "END" && <div className="h-10 rounded-lg border-2 border-dashed border-white/40 my-1" />}

                <button style={{
                    borderColor : moreLightenColor(boardData.color , 10),
                }} className={`w-full mt-2 border border-dashed cursor-pointer hover:backdrop-brightness-110 inline-flex items-center justify-center gap-1 rounded-lg p-2 text-[11px] text-white transition`}>
                    <Plus size={14} />
                    새 카드 추가
                </button>
            </div>
        </div>
    );
};

export default BoardComponent;