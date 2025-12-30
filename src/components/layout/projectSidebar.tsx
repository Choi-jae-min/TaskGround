import React from 'react';
import {cookies} from "next/headers";
import {ChevronDown} from "lucide-react";
import Link from 'next/link';

const ProjectSidebar = async () => {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    const workspaceListRes = await fetch(
        `${process.env.NEXT_PUBLIC_WORKSPACE_SERVER_URL}/workspace/me`,
        {
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookieHeader,
            },
            credentials: "include",
            cache: "no-store",
        }
    );
    if(!workspaceListRes.ok){
        return <aside className="hidden md:flex w-64 bg-[#202020] border-r border-r-[#2a2a2a] text-white border-gray-200 h-screen flex-col">
            <p className="p-4 font-bold text-lg flex items-center justify-between cursor-pointer border-b border-[#2a2a2a]">
                workspace
            </p>
        </aside>
    }
    const workspaceList = await workspaceListRes.json();
    return (
        <aside className="hidden md:flex w-64 bg-[#202020] border-r border-r-[#2a2a2a] text-white border-gray-200 h-screen flex-col">
            <p className="p-4 font-bold text-lg flex items-center justify-between cursor-pointer border-b border-[#2a2a2a]">
                workspace
            </p>
            <div className="px-4 py-2 border-b border-[#2a2a2a] bg-[#181818] text-sm max-h-56 overflow-y-auto">
                {workspaceList.map((m : {id :string, name : string}) => {
                    return <Link key={m.id} href={`/workspace/${m.id}`}>
                        <p className={'mt-1.5 w-full'}>{m.name}</p>
                    </Link>
                })}
            </div>
        </aside>
    );
};

export default ProjectSidebar;