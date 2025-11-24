'use client'
import React, {useState} from 'react';
import {Badge, Button, Modal, Select, TextInput} from "@mantine/core";

type Role = "OWNER" | "ADMIN" | "MEMBER";
type Status = "ACTIVE" | "INVITED";

interface Member {
    id: string;
    name: string;
    email: string;
    role: Role;
    status: Status;
}

const initialMembers: Member[] = [
    {
        id: "1",
        name: "홍길동",
        email: "owner@test.com",
        role: "OWNER",
        status: "ACTIVE",
    },
    {
        id: "2",
        name: "김개발",
        email: "dev1@test.com",
        role: "ADMIN",
        status: "ACTIVE",
    },
    {
        id: "3",
        name: "이디자이너",
        email: "design@test.com",
        role: "MEMBER",
        status: "INVITED",
    },
];

const roleOptions = [
    { value: "OWNER", label: "Owner" },
    { value: "ADMIN", label: "Admin" },
    { value: "MEMBER", label: "Member" },
];

const MemberForm = () => {
    const [members, setMembers] = useState<Member[]>(initialMembers);
    const [search, setSearch] = useState("");
    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState<Role>("MEMBER");

    const filteredMembers = members.filter((m) => {
        const keyword = search.trim().toLowerCase();
        if (!keyword) return true;
        return (
            m.name.toLowerCase().includes(keyword) ||
            m.email.toLowerCase().includes(keyword)
        );
    });

    const handleRoleChange = (id: string, nextRole: Role | null) => {
        if (!nextRole) return;

        // role update api 통신 작성

        setMembers((prev) =>
            prev.map((m) =>
                m.id === id
                    ? {
                        ...m,
                        role: m.role === "OWNER" ? "OWNER" : nextRole,
                    }
                    : m,
            ),
        );
    };

    const handleRemove = (id: string) => {
        // remove api 통신
        setMembers((prev) => prev.filter((m) => m.id !== id));
    };

    const handleInvite = () => {
        if (!inviteEmail.trim()) return;

        const newMember: Member = {
            id: String(Date.now()),
            name: inviteEmail.split("@")[0],
            email: inviteEmail.trim(),
            role: inviteRole,
            status: "INVITED",
        };

        setMembers((prev) => [...prev, newMember]);
        setInviteEmail("");
        setInviteRole("MEMBER");
        setInviteModalOpen(false);
    };
    return (
        <div className={'space-y-6 pt-6'}>
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <TextInput
                        placeholder="이름 또는 이메일로 검색"
                        value={search}
                        onChange={(e) => setSearch(e.currentTarget.value)}
                        className="hidden md:block focus:outline-none"
                        classNames={{
                            input:
                                "text-sm border-gray-300 focus:border-[var(--color-main)] focus:ring-1 focus:ring-[var(--color-main)]",
                        }}
                    />
                    <Button
                        onClick={() => setInviteModalOpen(true)}
                        color="rgba(36, 48, 64, 1)"
                    >
                        멤버 초대
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-lg bg-[#243040] p-4">
                    <p className="text-xs">전체 멤버</p>
                    <p className="mt-1 text-xl font-semibold">{members.length}명</p>
                </div>
                <div className="rounded-lg  bg-[#243040] p-4">
                    <p className="text-xs">초대중</p>
                    <p className="mt-1 text-xl font-semibold">
                        {members.filter((m) => m.status === "INVITED").length}명
                    </p>
                </div>
                <div className="rounded-lg bg-[#243040] p-4">
                    <p className="text-xs">관리 권한 (Owner + Admin)</p>
                    <p className="mt-1 text-xl font-semibold">
                        {members.filter((m) => m.role === "OWNER" || m.role === "ADMIN").length}명
                    </p>
                </div>
            </div>

            {/* 멤버 리스트 테이블 */}
            <div className="border rounded-lg bg-[#243040] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 border-b">
                    <p className="text-sm font-medium ">멤버 리스트</p>
                    <TextInput
                        placeholder="이름 / 이메일 검색"
                        value={search}
                        onChange={(e) => setSearch(e.currentTarget.value)}
                        className="md:hidden w-40"
                        classNames={{
                            input:
                                "text-xs border-gray-300 focus:border-[var(--color-main)] focus:ring-1 focus:ring-[var(--color-main)]",
                        }}
                    />
                </div>

                {filteredMembers.length === 0 ? (
                    <div className="p-6 text-sm text-gray-500">
                        검색 결과가 없습니다. 다른 키워드로 검색해보세요.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="border-b">
                            <tr>
                                <th className="px-4 py-2 text-left font-medium ">
                                    멤버
                                </th>
                                <th className="px-4 py-2 text-left font-medium ">
                                    이메일
                                </th>
                                <th className="px-4 py-2 text-left font-medium ">
                                    역할
                                </th>
                                <th className="px-4 py-2 text-left font-medium ">
                                    상태
                                </th>
                                <th className="px-4 py-2 text-right font-medium ">
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredMembers.map((member) => (
                                <tr key={member.id} className="border-b last:border-0">
                                    {/* 멤버 이름 */}
                                    <td className="px-4 py-3 align-middle">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold">
                                                {member.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium ">
                                                    {member.name}
                                                </p>
                                                {member.role === "OWNER" && (
                                                    <p className="text-[11px] ">
                                                        워크스페이스 소유자
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-4 py-3 align-middle">
                                        {member.email}
                                    </td>

                                    <td className="px-4 py-3 align-middle">
                                        {member.role === "OWNER" ? (
                                            <Badge color="grape" variant="light" size="sm">
                                                Owner
                                            </Badge>
                                        ) : (
                                            <Select
                                                data={roleOptions.filter((r) => r.value !== "OWNER")}
                                                value={member.role}
                                                onChange={(value) =>
                                                    handleRoleChange(member.id, value as Role)
                                                }
                                                size="xs"
                                                className="max-w-[140px]"
                                            />
                                        )}
                                    </td>

                                    <td className="px-4 py-3 align-middle">
                                        {member.status === "ACTIVE" ? (
                                            <Badge color="green" variant="light" size="sm">
                                                활성
                                            </Badge>
                                        ) : (
                                            <Badge color="yellow" variant="light" size="sm">
                                                초대중
                                            </Badge>
                                        )}
                                    </td>

                                    <td className="px-4 py-3 align-middle text-right">
                                        <div className="flex justify-end gap-2">
                                            {member.status === "INVITED" && (
                                                <Button
                                                    variant="subtle"
                                                    size="xs"
                                                    onClick={() =>
                                                        console.log("초대 다시 보내기:", member.email)
                                                    }
                                                >
                                                    초대 다시 보내기
                                                </Button>
                                            )}
                                            {member.role !== "OWNER" && (
                                                <Button
                                                    color="red"
                                                    variant="subtle"
                                                    size="xs"
                                                    onClick={() => handleRemove(member.id)}
                                                >
                                                    제거
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <Modal
                opened={inviteModalOpen}
                onClose={() => setInviteModalOpen(false)}
                title="새 멤버 초대"
                centered
            >
                <div className="space-y-4">
                    <TextInput
                        label="이메일"
                        placeholder="user@example.com"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.currentTarget.value)}
                    />
                    <Select
                        label="역할"
                        data={roleOptions}
                        value={inviteRole}
                        onChange={(value) => setInviteRole((value as Role) || "MEMBER")}
                    />

                    <Button
                        fullWidth
                        className="mt-2 bg-main hover:bg-main/90"
                        onClick={handleInvite}
                    >
                        초대 보내기
                    </Button>
                </div>
            </Modal>
        </div>

    );
};

export default MemberForm;