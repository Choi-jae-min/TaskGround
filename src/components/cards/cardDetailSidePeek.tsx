"use client";
import React, {useEffect, useRef, useState} from "react";
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

interface CardDetailSidePeekProps {
    opened: boolean;
    onClose: () => void;
    task: Task;
    updateTask : (id:string ,field: "title" | "description" | "tag" | "dueDate" | "assignee", value: string) => void;
    boardName :string;
}

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
    const history = useRef(new History<IBlocks[]>({ limit: 50 })).current;

    useEffect(() => {
        // block 리스트 조회
    }, []);
    const [blocks, setBlocks] = useState<IBlocks[]>([initBlock]);
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
                    data={tagOptions}
                    value={task?.tag}
                    onChange={(value) => {
                        updateTask(task.id ,'tag' , value || '');
                    }}
                    size="xs"
                />
            </span>

            <span className={'flex gap-2 items-center pt-4'}>
                <h2 className={'w-[100px] font-bold text-gray-500'}>마감일</h2>
                <p>{task?.dueDate ? formatDate(task?.dueDate) : ''}</p>
            </span>

            <Divider my="sm" label="Description" labelPosition="left" />
            <Block
                history={history}
                blocks={blocks}
                setBlocks={setBlocks}
                handleChange={handleChange}
                addBlockAfter={addBlockAfter}
                deleteBlockCurr={deleteBlockCurr}
                deleteBlockCurrPushToPrevEl={deleteBlockCurrPushToPrevEl}/>
        </Drawer>
    );
}
