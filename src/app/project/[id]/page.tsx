'use client'
import { Plus } from "lucide-react";
import BoardComponent from "@/app/project/[id]/boardComponent";
import React, {useState} from "react";
import {useProject} from "@/app/project/[id]/BoardContext";
import {moreDarkenColor, moreLightenColor, setThemeColor} from "@/utility/utility";
import ColorPicker from "@/components/cards/colorPicker";

export default function ProjectPage() {
    const project = useProject();
    const [boardData, setBoardData] = useState(project.board)
    const [showBoardInput, setShowBoardInput] = useState(false);
    const [newBoardName , setNewBoardName] = useState('')
    const [colorName, setColorName] = useState("DEFAULT");

    const handleBoardData = (fromBoardId: string, toBoardId: string, taskId: string, index: string) => {
        setBoardData((prevBoards) => {
            const boards = prevBoards.map((b) => ({
                ...b,
                task: [...b.task],
            }));

            const fromBoard = boards.find((b) => b.id === fromBoardId);
            const toBoard = boards.find((b) => b.id === toBoardId);
            if (!fromBoard || !toBoard) return prevBoards;

            const fromTasks = fromBoard.task;
            const fromIndex = fromTasks.findIndex((t) => t.id === taskId);
            if (fromIndex === -1) return prevBoards;

            const [movedTask] = fromTasks.splice(fromIndex, 1);

            const toTasks = toBoard.task;

            const insertIndex = index === "END" ? toTasks.length : toTasks.findIndex((t) => t.id === index);
            if (insertIndex === -1) return prevBoards;

            toTasks.splice(insertIndex, 0, movedTask);

            return boards;
        });
    };
    const handleAddBoard = async (e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        const res = await fetch(`${process.env.NEXT_PUBLIC_WORKSPACE_SERVER_URL}/board`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({name : newBoardName,color : colorName, projectId : project.id}),
        })

        if(res.ok){
            const resJson = await res.json();
            setBoardData((prevState) => {
                return [...prevState , resJson];
            })
            setNewBoardName('')
            setColorName("DEFAULT")
            return setShowBoardInput(false)
        }
        return alert('보드 생성 실패하였습니다 잠시 후 다시 시도해주세요.')
    }

    return (
        <div className={'flex w-full gap-4 p-4'}>
            {boardData.map((board) => (
                <BoardComponent key={board.id} board={{...board , color : setThemeColor(board.color)}} handleBoardData={handleBoardData}/>
            ))}

            {showBoardInput && <div>
                <form onSubmit={handleAddBoard} style={{backgroundColor : setThemeColor(colorName)}} className="flex-shrink-0 text-14 w-72 rounded-xl flex flex-col p-2 h-48 gap-1">
                    <h2>보드 제목</h2>
                    <div
                        style={{
                            backgroundColor : moreDarkenColor(setThemeColor(colorName) , 5)
                        }}
                        className={'flex items-center cursor-pointer rounded-full px-3'}>
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: moreLightenColor(setThemeColor(colorName) ,10) }}
                        /><input required value={newBoardName} onChange={(e) => {setNewBoardName(e.target.value)}}  type="text" className={'focus:outline-none px-2 py-1.5'}/>
                    </div>

                    <h3>보드 색상</h3>
                    <ColorPicker value={colorName} onChange={setColorName}/>

                    <button className={'border mt-2 py-1 rounded-2xl text-16'}>생성</button>
                </form>
            </div>}
            <button
                onClick={() => {setShowBoardInput(true)}}
                className="flex-shrink-0 w-64 h-48 border border-dashed border-slate-800 rounded-xl flex items-center justify-center text-xs text-white hover:border-slate-700">
                <Plus size={16} className="mr-1" />
                새 보드 추가
            </button>
        </div>
    );
}
