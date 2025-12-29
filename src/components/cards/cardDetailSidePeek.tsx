"use client";
import React, {useEffect, useState} from "react";
import {
    Drawer,
    Select,
    Badge,
    Group,Divider
} from "@mantine/core";
import {Task} from "@/components/cards/taskCard";
import {formatDate} from "@/utility/utility";
import Block, {IBlocks} from "../block";
import {History} from "@/hooks/history";
import {useDebouncedValue} from "@mantine/hooks";
import { DatePicker} from "@mantine/dates";
import {useParams} from "next/navigation";
import js from "@eslint/js";

interface CardDetailSidePeekProps {
    opened: boolean;
    onClose: () => void;
    task: Task;
    updateTask : (id:string ,field: "title" | "description" | "tag" | "dueDate" | "assignee", value: string) => void;
    boardName :string;
}

type SelectOption = { value: string; label: string };

const tagOptions = [
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
    { value: "design", label: "Design" },
    { value: "review", label: "Review" },
];

const initBlock : IBlocks ={
    id: "b1",
    html : '',
}

export default function CardDetailSidePeek({opened, onClose, task, boardName ,updateTask}: CardDetailSidePeekProps) {
    const params = useParams();
    const projectId = params.id as string;
    const [memberList, setMemberList] = useState<SelectOption[]>([]);

    const getMemberList = async () => {
        const getMemberListRes = await fetch(`${process.env.NEXT_PUBLIC_WORKSPACE_SERVER_URL}/member/project/${projectId}`, {
            method : "GET",
            cache : 'default'
        })
        if(getMemberListRes.ok) {
            const json = await getMemberListRes.json();
            const options: SelectOption[] = json.map((m: string) => ({
                value: m,
                label: m,
            }));
            console.log('options' , options)
            setMemberList(options);
            return;
        }
    }
    useEffect(() => {
        if (!opened) return;
        if (!projectId) return;

        (async () => {
            await getMemberList();
        })();
    }, [opened, projectId]);
    const [history] = useState(() => new History<IBlocks[]>({ limit: 50 }));
    const [blocks, setBlocks] = useState<IBlocks[]>([initBlock]);
    const [debounced] = useDebouncedValue(blocks, 200);
    const handleChange = (value: string, id: string) => {
        setBlocks((prev) => {
            const next = prev.map((block) =>
                block.id === id
                    ? { ...block, html: value === "<br>" ? "" : value }
                    : block
            );
            history.push(structuredClone(next));
            return next;
        });
    };
    const [isCalOpen, setIsCalOpen] = useState(false);

    const addBlockAfter= (index : number) =>{
        setBlocks((prev) => {
            const next = [...prev];
            const newBlock = {
                id: `b`+ Math.random() * Math.random(),
                html: "",
                tag: "p",
                flag: 0,
            };
            next.splice(index + 1, 0, newBlock);
            return next;
        });
    }

    const deleteBlockCurr = (index : number) => {
        setBlocks((prev) => {
            const next = [...prev];
            next.splice(index,1);
            return next;
        });
    }
    const deleteBlockCurrPushToPrevEl = (index: number) => {
        setBlocks((prev) => {
            if (index <= 0) return prev;
            const next = prev.map((b) => ({ ...b }));
            const curr = next[index];
            const prevBlock = next[index - 1];

            if (curr.html && curr.html.trim() !== "") {
                prevBlock.html = prevBlock.html + curr.html;
            }

            next.splice(index, 1);
            return next;
        });
    };


    return (
        <Drawer
            className={'text-white'}
            opened={opened}
            onClose={onClose}
            position="right"
            size="50%"
            padding="md"
            withOverlay
            trapFocus
            overlayProps={{ opacity: 0.35, blur: 4 }}
            styles={{
                header: {
                    backgroundColor: "#202020",
                },
                body: {
                    backgroundColor: "#202020",
                },
                content: {
                    backgroundColor: "#202020",
                },
            }}
            title={
                <Group gap="xs">
                    <Badge variant="light" size="lg" color="gray">
                        {boardName}
                    </Badge>
                </Group>
            }
        >
            <div className={'text-24 font-bold'}>
                <input
                    className={'focus:outline-none w-full py-2 mt-1'}
                    placeholder="카드 제목을 입력하세요"
                    value={task?.title || ''}
                    onChange={(e) => {
                        updateTask(task.id ,'title' , e.target.value);
                    }}
                ></input>
            </div>
            <span className={'flex gap-2 items-center pt-2'}>
                <h2 className={'w-[100px] font-bold text-gray-500'}>태그</h2>
                <Select
                    data={tagOptions}
                    value={task?.tag}
                    onChange={(value) => {
                        updateTask(task.id ,'tag' , value || '');
                    }}
                    size="xs"
                />
            </span>

            <span className={'flex gap-2 items-center pt-4'}>
                <h2 className={'w-[100px] font-bold text-gray-500'}>담당자</h2>
                <Select
                    data={memberList}
                    value={task?.assignee}
                    onChange={(value) => {
                        updateTask(task.id, "assignee", value ?? "");
                    }}
                    size="xs"
                    placeholder="담당자 선택"
                    searchable
                    clearable
                />
            </span>

            <span className={'flex gap-2 items-center pt-4'}>
                <h2 className={'w-[100px] font-bold text-gray-500'}>마감일</h2>
                <p className={`${isCalOpen ? 'hidden' : ""}`} onClick={() => {setIsCalOpen(!isCalOpen)}}>{task?.dueDate ? formatDate(task?.dueDate) : ''}</p>
                {isCalOpen && <div className={'relative'}>
                    <DatePicker
                        value={task.dueDate}
                        className={'bg-white absolute'}
                        getDayProps={(date) => ({
                            onClick: (e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                updateTask(task.id ,'dueDate' , date || '');
                                setIsCalOpen(!isCalOpen);
                            },
                        })}
                    />
                </div>
                }
            </span>

            <Divider my="sm" label="Description" labelPosition="left" />
            <Block
                history={history}
                blocks={debounced}
                setBlocks={setBlocks}
                handleChange={handleChange}
                addBlockAfter={addBlockAfter}
                deleteBlockCurr={deleteBlockCurr}
                deleteBlockCurrPushToPrevEl={deleteBlockCurrPushToPrevEl}/>
        </Drawer>
    );
}
