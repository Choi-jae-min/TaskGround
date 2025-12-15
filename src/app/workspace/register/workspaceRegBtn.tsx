import React, {FC, useState} from 'react';
import {Modal} from "@mantine/core";
import {useRouter} from "next/navigation";

interface Props {
    className ?:string;
}

const WorkspaceRegBtn:FC<Props> = ({className}) => {
    const router = useRouter();
    const [workSpaceData, setWorkSpaceData] = useState({
        name: "",
        description: "",
    });
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const openCreateModal = () => setCreateModalOpen(true);
    const closeCreateModal = () => setCreateModalOpen(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setWorkSpaceData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_WORKSPACE_SERVER_URL}/workspace`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(workSpaceData),
        })

        if(res.ok){
            const resJson = await res.json()
            closeCreateModal();
            return router.push(`/workspace/${resJson.id}`)
        }
        alert('워크스페이스 생성 실패하였습니다. 잠시 후 다시 시도해주세요.')
        return closeCreateModal();
    };
    return (
        <div className={`${className ? className : ''}`}>
            <button
                className="w-full rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-200 hover:border-slate-600 hover:bg-slate-900 transition"
                onClick={openCreateModal}>워크스페이스 생성</button>
            <Modal
                opened={createModalOpen}
                withCloseButton={false}
                onClose={closeCreateModal}
                title="새 워크스페이스 생성"
                centered
                size="md"
            >
                <form className="pt-2 space-y-5 text-black " onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">
                            워크스페이스 이름 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={workSpaceData.name}
                            onChange={handleChange}
                            placeholder="예: TaskGround Dev Team"
                            className="w-full border rounded-md px-3 py-2 outline-none text-sm focus:outline-none"
                        />
                        <p className="text-xs text-gray-500">팀 또는 프로젝트 이름을 입력하세요.</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">설명 (선택)</label>
                        <textarea
                            name="description"
                            value={workSpaceData.description}
                            onChange={handleChange}
                            placeholder="워크스페이스에 대한 간단한 설명을 입력하세요."
                            className="w-full border rounded-md px-3 py-2 h-24 resize-none outline-none text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                    >
                        워크스페이스 생성
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default WorkspaceRegBtn;