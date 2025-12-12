'use client'
import { Plus } from "lucide-react";
import BoardComponent from "@/app/project/[id]/boardComponent";
import {useState} from "react";
import {useProject} from "@/app/project/[id]/BoardContext";
import {setThemeColor} from "@/utility/utility";

export default function ProjectPage() {
    const project = useProject();
    const [boardData, setBoardData] = useState(project.board)

    const handleBoardData = (fromBoardId: string, toBoardId: string, taskId: string, index: string) => {
        setBoardData((prevBoards) => {
            const boards = prevBoards.map((b) => ({
                ...b,
                tasks: [...b.task],
            }));

            const fromBoard = boards.find((b) => b.id === fromBoardId);
            const toBoard = boards.find((b) => b.id === toBoardId);
            if (!fromBoard || !toBoard) return prevBoards;

            const fromTasks = fromBoard.tasks;
            const fromIndex = fromTasks.findIndex((t) => t.id === taskId);
            if (fromIndex === -1) return prevBoards;

            const [movedTask] = fromTasks.splice(fromIndex, 1);

            const toTasks = toBoard.tasks;

            const insertIndex = index === "END" ? toTasks.length : toTasks.findIndex((t) => t.id === index);
            if (insertIndex === -1) return prevBoards;

            toTasks.splice(insertIndex, 0, movedTask);

            return boards;
        });
    };


    return (
        <div className={'flex w-full gap-4 p-4'}>
            {boardData.map((board) => (
                <BoardComponent key={board.id} board={{...board , color : setThemeColor(board.color)}} handleBoardData={handleBoardData}/>
            ))}
            <button className="flex-shrink-0 w-64 h-48 border border-dashed border-slate-800 rounded-xl flex items-center justify-center text-xs text-white hover:border-slate-700">
                <Plus size={16} className="mr-1" />
                새 보드 추가
            </button>
        </div>
    );
}
