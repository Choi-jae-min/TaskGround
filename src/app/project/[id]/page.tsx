import React from "react";
import { Plus } from "lucide-react";
import BoardComponent from "@/app/project/[id]/boardComponent";
import {BoardColumn} from "@/components/cards/taskCard";

const mockBoards: BoardColumn[] = [
    {
        id: "backlog",
        name: "Backlog",
        color: "#464b65",
        tasks: [
            {
                id: "t1",
                title: "워크스페이스 메인 페이지 디자인",
                description: "Hero 섹션, CTA, 기능 섹션 구성",
                tag: "design",
                assignee: "JM",
            },
            {
                id: "t2",
                title: "멤버 초대 API 설계",
                tag: "backend",
                assignee: "JM",
            },
            {
                id: "t7",
                title: "멤버 초대 API 설계",
                tag: "backend",
                assignee: "JM",
            },
            {
                id: "t3",
                title: "멤버 초대 API 설계",
                tag: "backend",
                assignee: "JM",
            },
            {
                id: "t4",
                title: "멤버 초대 API 설계",
                tag: "backend",
                assignee: "JM",
            },
            {
                id: "t5",
                title: "멤버 초대 API 설계",
                tag: "backend",
                assignee: "JM",
            },
            {
                id: "t6",
                title: "멤버 초대 API 설계",
                tag: "backend",
                assignee: "JM",
            },
            {
                id: "t10",
                title: "멤버 초대 API 설계",
                tag: "backend",
                assignee: "JM",
            },
            {
                id: "t19",
                title: "1231231231",
                tag: "backend",
                assignee: "JM",
            },
        ],
    },
    {
        id: "in-progress",
        name: "진행 중",
        color: "#4e7e67",
        tasks: [
            {
                id: "t3",
                title: "워크스페이스 레이아웃 구축",
                description: "Sidebar / Topbar / layout.tsx 구조 정리",
                tag: "frontend",
                assignee: "JM",
                dueDate: "오늘",
            },
        ],
    },
    {
        id: "review",
        name: "검토 필요",
        color: "#a69a6c",
        tasks: [
            {
                id: "t4",
                title: "멤버 리스트 페이지 UI 리뷰",
                tag: "review",
                assignee: "YK",
            },
        ],
    },
    {
        id: "done",
        name: "완료",
        color: "#774e83",
        tasks: [
            {
                id: "t5",
                title: "메인 랜딩 페이지 제작",
                tag: "frontend",
                assignee: "JM",
            },
        ],
    },
    {
        id: "add",
        name: "추가작업",
        color: "#4d566e",
        tasks: [
            {
                id: "t5",
                title: "메인 랜딩 페이지 제작",
                tag: "frontend",
                assignee: "JM",
            },
        ],
    },
];


export default function ProjectPage() {
    return (
        <div className={'flex w-full flex-1 gap-4 p-4'}>
            {mockBoards.map((board) => (
                <BoardComponent key={board.id} board={board} />
            ))}

            <button className="flex-shrink-0 w-64 h-48 border border-dashed border-slate-800 rounded-xl flex items-center justify-center text-xs text-white hover:border-slate-700">
                <Plus size={16} className="mr-1" />
                새 보드 추가
            </button>
        </div>
    );
}
