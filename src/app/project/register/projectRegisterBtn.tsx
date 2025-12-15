'use client'
import React, {FC, useState} from 'react';
import {Button, Modal, Textarea, TextInput} from "@mantine/core";
import {useRouter} from "next/navigation";

interface Props{
    workspaceId : string
}

const ProjectRegisterBtn:FC<Props> = ({workspaceId}) => {
    const router = useRouter();
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");


    const [createModalOpen, setCreateModalOpen] = useState(false);
    const openCreateModal = () => setCreateModalOpen(true);
    const closeCreateModal = () => setCreateModalOpen(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch(`${process.env.NEXT_PUBLIC_WORKSPACE_SERVER_URL}/project`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({name : projectName,description : description, workspaceId : workspaceId}),
        })

        if(res.ok){
            closeCreateModal();
            return router.refresh()
        }
        alert('프로젝트 생성 실패하였습니다 잠시 후 다시 시도해주세요.')
        return closeCreateModal();
    };
    return (
        <div>
            <button
                className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-200 hover:border-slate-600 hover:bg-slate-900 transition"
                onClick={openCreateModal}>프로젝트 생성</button>
            <Modal
                opened={createModalOpen}
                withCloseButton={false}
                onClose={closeCreateModal}
                title="새 프로젝트 생성"
                centered
                size="md"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <TextInput
                        label="프로젝트 이름"
                        placeholder="예: Admin 리뉴얼, 셀프 개통 개선"
                        value={projectName}
                        onChange={(e) => setProjectName(e.currentTarget.value)}
                        required
                    />
                    <Textarea
                        label="설명 (선택)"
                        placeholder="프로젝트에 대한 간단한 설명을 입력하세요."
                        minRows={3}
                        autosize
                        value={description}
                        onChange={(e) => setDescription(e.currentTarget.value)}
                    />

                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            variant="subtle"
                            color="gray"
                            onClick={closeCreateModal}
                            type="button"
                        >
                            취소
                        </Button>
                        <Button type="submit" color="grape">
                            생성
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ProjectRegisterBtn;