"use client";
import React from "react";
import {
    Drawer,
    Select,
    Badge,
    Group, ScrollArea, Stack, Textarea, Text,Divider
} from "@mantine/core";
import {Task} from "@/components/cards/taskCard";
import {formatDate} from "@/utility/utility";

interface CardDetailSidePeekProps {
    opened: boolean;
    onClose: () => void;
    task: Task;
    setTask: (task :Task) => void;
    updateTask : (field: "title" | "description" | "tag" | "dueDate" | "assignee", value: string) => void;
    boardName :string;
}

const tagOptions = [
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
    { value: "design", label: "Design" },
    { value: "review", label: "Review" },
];

export default function CardDetailSidePeek({opened, onClose, task, setTask, boardName ,updateTask}: CardDetailSidePeekProps) {
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
                    value={task?.title}
                    onChange={(e) => {
                        setTask({...task , title : e.target.value})
                        updateTask('title' , e.target.value);
                    }}
                ></input>
            </div>
            <span className={'flex gap-2 items-center pt-2'}>
                <h2 className={'w-[100px] font-bold text-gray-500'}>태그</h2>
                <Select
                    data={tagOptions}
                    value={task?.tag}
                    onChange={(value) => {
                        setTask({...task , tag : value || task.tag})
                        updateTask('tag' , value || '');
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
                        setTask({...task , tag : value || task.tag})
                        updateTask('tag' , value || '');
                    }}
                    size="xs"
                />
            </span>

            <span className={'flex gap-2 items-center pt-4'}>
                <h2 className={'w-[100px] font-bold text-gray-500'}>마감일</h2>
                <p>{task?.dueDate ? formatDate(task?.dueDate) : ''}</p>
            </span>

            <Divider my="sm" label="Description" labelPosition="left" />

            <div>
                <Text size="xs" c="dimmed">
                    내용 (Markdown 지원)
                </Text>
                <textarea
                    className={'focus:outline-none resize-none min-h-[80px] w-full'}
                    placeholder="여기에 마크다운 형식으로 내용을 작성하세요.&#10;예) ## 제목, - 리스트, ```코드``` 등"
                    value={task?.description}
                    onChange={(e) => {
                        e.target.style.height = "auto";
                        e.target.style.height = `${e.target.scrollHeight}px`;
                        setTask({...task , description : e.target.value})
                        updateTask('description' , e.target.value);
                    }}
                />
            </div>
        </Drawer>
    );
}
