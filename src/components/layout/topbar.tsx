"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Home, Users, Settings } from "lucide-react";

export default function Topbar() {
    const [wsOpen, setWsOpen] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const params = useParams<{ id?: string }>();
    const pathname = usePathname();
    const workspaceId = params.id;

    const wsButtonRef = useRef<HTMLButtonElement | null>(null);
    const wsDropdownRef = useRef<HTMLDivElement | null>(null);

    const NAV = [
        { name: "대시보드", href: `/workspace/${workspaceId}`, icon: <Home size={18} /> },
        { name: "멤버", href: `/workspace/${workspaceId}/members`, icon: <Users size={18} /> },
        { name: "설정", href: `/workspace/${workspaceId}/settings`, icon: <Settings size={18} /> },
    ];

    useEffect(() => {
        if (!wsOpen) return;

        function handleClickOutside(e: MouseEvent) {
            const target = e.target as Node;
            if (
                wsButtonRef.current?.contains(target) ||
                wsDropdownRef.current?.contains(target)
            ) {
                return;
            }
            setWsOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wsOpen]);

    return (
        <header className="h-14 border-b border-b-[#2a2a2a] bg-[#202020] flex items-center justify-between px-4 md:px-6 relative">
            <button
                ref={wsButtonRef}
                onClick={() => setWsOpen((prev) => !prev)}
                className="flex items-center gap-1 font-medium hover:bg-[#2a2a2a] px-3 py-1 rounded-md transition text-sm md:text-base"
            >
                현재 워크스페이스 : {workspaceId}
            </button>

            <div className="flex items-center gap-3">
                <div className="hidden md:block w-8 h-8 rounded-full bg-gray-300" />

                <button
                    className="md:hidden p-2 rounded-md hover:bg-gray-100"
                    onClick={() => setMobileNavOpen((prev) => !prev)}
                >
                    {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* 모바일 네비 */}
            {mobileNavOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setMobileNavOpen(false)}
                    />

                    <div className="absolute top-14 left-0 w-64 h-[calc(100vh-56px)] bg-white shadow-lg flex flex-col animate-[leftToRight_0.2s_ease-out]">
                        <div className="p-4 font-bold text-lg border-b">
                            Workspace {workspaceId}
                        </div>

                        <nav className="mt-2 flex-1">
                            {NAV.map((item) => {
                                const active = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileNavOpen(false)}
                                    >
                                        <div
                                            className={`flex items-center gap-3 px-4 py-3 cursor-pointer text-sm transition 
                      ${active ? "bg-gray-100 font-medium" : "hover:bg-gray-50"}`}
                                        >
                                            {item.icon}
                                            {item.name}
                                        </div>
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="p-4 text-xs text-gray-500 border-t">© 2025 My App</div>
                    </div>
                </div>
            )}
            {wsOpen && (
                <div
                    ref={wsDropdownRef}
                    className="
            absolute top-16 left-4 md:left-6 text-white bg-[#202020] shadow-md border rounded-md w-56
            animate-[slideDown_0.2s_ease-out]
          "
                >
                    <div className="p-2 border-b text-gray-500 text-sm">워크스페이스 전환</div>

                    <Link href={`/workspace/1`} onClick={() => setWsOpen(false)}>
                        <div className="w-full text-left px-3 py-2 hover:bg-[#2a2a2a]">
                            워크스페이스 1
                        </div>
                    </Link>

                    <Link href={`/workspace/2`} onClick={() => setWsOpen(false)}>
                        <div className="w-full text-left px-3 py-2 hover:bg-[#2a2a2a]">
                            워크스페이스 2
                        </div>
                    </Link>

                    <div className="border-t mt-2">
                        <Link href={`/workspace/register`}>
                            <div className="w-full text-left text-blue-600 px-3 py-2 hover:bg-[#2a2a2a]">
                                + 새 워크스페이스 생성
                            </div>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
