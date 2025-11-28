"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Home, Users, Settings } from "lucide-react";

export default function Sidebar() {
    const pathname = usePathname();
    const params = useParams<{ id?: string }>();
    const workspaceId = params.id;
    const currentMenu = pathname.includes('members') ? "member": pathname.includes('settings') ? 'setting':'workspace'
    const NAV = [
        { name: "대시보드", href: `/workspace/${workspaceId}`, icon: <Home size={18} /> },
        { name: "멤버", href: `/workspace/${workspaceId}/members`, icon: <Users size={18} /> },
        { name: "설정", href: `/workspace/${workspaceId}/settings`, icon: <Settings size={18} /> },
    ];

    return (
        <aside className="hidden md:flex w-64 bg-[#202020] border-r border-r-[#2a2a2a] text-white border-gray-200 h-screen flex-col">
            <div className="p-4 font-bold text-lg">{currentMenu}</div>

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
