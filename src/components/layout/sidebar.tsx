"use client";

import Link from "next/link";
import {useParams, usePathname, useRouter} from "next/navigation";
import { Home, Users, Settings, UserRound, ChevronDown } from "lucide-react";
import {useEffect, useState} from "react";

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams<{ id?: string }>();
    const workspaceId = params.id;
    const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
    const [workspaces, setWorkspaces] = useState<{id : string;name : string}[]>([]);
    const currentMenu = pathname.includes('members') ? "member": pathname.includes('settings') ? 'setting':'workspace'
    const NAV = [
        { name: "대시보드", href: `/workspace/${workspaceId}`, icon: <Home size={18} /> },
        { name: "멤버", href: `/workspace/${workspaceId}/members`, icon: <Users size={18} /> },
        { name: "설정", href: `/workspace/${workspaceId}/settings`, icon: <Settings size={18} /> },
        { name: "마이페이지", href: `/auth/mypage`, icon: <UserRound size={18} /> },
    ];
    useEffect(() => {
        const fetchWorkspaces = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_WORKSPACE_SERVER_URL}/workspace/me`,
                    {
                        credentials: "include",
                    }
                );
                if (!res.ok) {
                    throw new Error("failed to fetch workspaces");
                }
                const data = await res.json();
                setWorkspaces(data);
            } catch (err) {
                console.error("워크스페이스 목록 불러오기 실패:", err);
            }
        };
        fetchWorkspaces();
    }, []);

    return (
        <aside className="hidden md:flex w-64 bg-[#202020] border-r border-r-[#2a2a2a] text-white border-gray-200 h-screen flex-col">
            <div
                className="p-4 font-bold text-lg flex items-center justify-between cursor-pointer border-b border-[#2a2a2a]"
                onClick={() => setIsWorkspaceOpen((prev) => !prev)}
            >
                <span>{currentMenu}</span>
                <ChevronDown
                    size={18}
                    className={`transition-transform ${isWorkspaceOpen ? "rotate-180" : ""}`}
                />
            </div>

            {isWorkspaceOpen && (
                <div className="px-4 py-2 border-b border-[#2a2a2a] bg-[#181818] text-sm max-h-56 overflow-y-auto">
                    {workspaces.map((workspace) => {
                            const isCurrent = workspace.id === workspaceId;
                            return (
                                <button
                                    key={workspace.id}
                                    onClick={() => {
                                        setIsWorkspaceOpen(false);
                                        router.push(`/workspace/${workspace.id}`);
                                    }}
                                    className={`mt-1.5 w-full flex items-center justify-between px-3 py-2 rounded-md text-left hover:bg-gray-700 ${
                                        isCurrent ? "bg-gray-700 text-white" : "text-gray-200"
                                    }`}
                                >
                                    <span className="truncate">{workspace.name}</span>
                                    {isCurrent && <span className="text-xs text-gray-300">현재</span>}
                                </button>
                            );
                    })}
                </div>
            )}

            <nav className="mt-4 flex-1">
                {NAV.map((item) => {
                    const active = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <div
                                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition 
                ${active ? "bg-gray-500 font-medium" : "hover:bg-gray-600"}`}
                            >
                                {item.icon}
                                {item.name}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 text-sm text-gray-600">© 2025 My App</div>
        </aside>
    );
}
