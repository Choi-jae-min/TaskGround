'use client'
import React, {useEffect, useState} from 'react';
import {Plus} from "lucide-react";
import TaskCard, {BoardColumn, Task} from "@/components/cards/taskCard";
import {moreDarkenColor, moreLightenColor} from "@/utility/utility";
import CardDetailSidePeek from '@/components/cards/cardDetailSidePeek';
import {useDebouncedCallback, useDebouncedState} from "@mantine/hooks";

const BoardComponent:React.FC<{ board: BoardColumn , handleBoardData: (fromBoardId :string,toBoardId :string, taskId:string, index : string) => void}> = ({ board,handleBoardData}) => {
    const [tasks , setTasks] = useDebouncedState(board.task || [],300)
    const [taskHoverId , setTaskHoverId] = useState<string | "END" |null>(null);
    const [toBoardId , setToBoardId] = useState<string | null>(null);
    const [opened, setOpened] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    useEffect(() => {
        setTasks(board.task ?? []);
    }, [board.task, setTasks]);
    const handleSearch = useDebouncedCallback(async (id : string,field: "title" | "description" | "tag" | "dueDate" | "assignee", value: string) => {
        const addRes = await fetch(`${process.env.NEXT_PUBLIC_WORKSPACE_SERVER_URL}/task/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                [field]: value,
                version : selectedTask?.version
            }),
        })
        if(!addRes.ok){
            return alert('에러')
        }
        setSelectedTask(prev =>
            prev && prev.id === id ? { ...prev, version : prev.version! + 1 } : prev
        );
    }, 500);

    const addEmptyTask = async () => {
        const date = new Date()
        const addRes = await fetch(`${process.env.NEXT_PUBLIC_WORKSPACE_SERVER_URL}/task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                title: "",
                description: "",
                assignee: "",
                tag: "",
                boardId: board.id,
                dueDate: date
            }),
        })
        if(!addRes.ok){
            return alert('에러')
        }
        const resJson = await addRes.json()
        setTasks((prevState) => {
            const next = [...prevState];
            const addTask:Task = {
                id: resJson.task.id,
                title: '',
                description: '',
                tag: '',
                assignee: '',
                dueDate: date.toDateString(),
                version : 1
            }
            next.push(addTask)
            setSelectedTask(addTask)
            return next
        })
    }
    const updateTask =async (id : string,field: "title" | "description" | "tag" | "dueDate" | "assignee", value: string) => {
        setTasks((prevState) => {
            if (!id) return prevState;
            return prevState.map((task) =>
                task.id === id
                    ? { ...task, [field]: field === 'dueDate' ? new Date(value) : value }
                    : task
            );
        });
        setSelectedTask(prev =>
            prev && prev.id === id ? { ...prev, [field]: value} : prev
        );

        handleSearch(id, field,value);
    };

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
                    {board.task ? board.task.length : 0}
                </span>
            </div>

            <div
                className="pt-2 space-y-2 min-h-[20px]">
                {tasks && tasks.map((task) => (
                    <div
                        onClick={() => {
                            setSelectedTask(task);
                            setOpened(true);
                        }}
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

                <button
                    onClick={() => {
                        addEmptyTask()
                        setOpened(!opened)}
                }
                    style={{
                    borderColor : moreLightenColor(board.color , 10),
                }} className={`w-full mt-2 border border-dashed cursor-pointer hover:backdrop-brightness-110 inline-flex items-center justify-center gap-1 rounded-lg p-2 text-[11px] text-white transition`}>
                    <Plus size={14} />
                    새 카드 추가
                </button>
            </div>

            <CardDetailSidePeek
                opened={opened}
                onClose={() => setOpened(false)}
                task={selectedTask!}
                boardName={board.name}
                updateTask={updateTask}
            />
        </div>
    );
};

export default BoardComponent;