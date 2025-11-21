"use client";

import React, { useState } from "react";
import { MultiSelect } from '@mantine/core';

const WorkspaceRegForm = () => {
    const [workSpaceData, setWorkSpaceData] = useState({
        name: "",
        description: "",
        color: "",
        members: ["currentUser"],// member는 추후분리해야함.
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setWorkSpaceData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleColorSelect = (color: string) => {
        setWorkSpaceData((prev) => ({
            ...prev,
            color,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("최종 워크스페이스 데이터:", workSpaceData);

    };

    return (
        <form className="mt-6 space-y-5 text-black " onSubmit={handleSubmit}>
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

            <div>
                <label className="text-sm font-medium text-gray-700">
                    맴버 이메일
                </label>
                <MultiSelect
                    placeholder="search your team member"
                    limit={5}
                    searchable
                    data={['user1@test.com', 'user2@test.com', 'user3@test.com', 'user4@test.com']}
                    styles={{
                        input: {
                            border: "1px solid #000000FF",
                        },
                    }}
                />

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

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                    워크스페이스 색상 (선택)
                </label>

                <div className="flex gap-2">
                    {["#8B5CF6", "#10b981", "#f43f5e", "#f59e0b", "#8b5cf6"].map((color) => {
                        const isSelected = workSpaceData.color === color;

                        return (
                            <button
                                key={color}
                                type="button"
                                onClick={() => handleColorSelect(color)}
                                className={`w-8 h-8 rounded-full border relative hover:scale-110 transition ${
                                    isSelected ? "ring-2 ring-offset-2 ring-blue-500" : ""
                                }`}
                                style={{ backgroundColor: color }}
                            />
                        );
                    })}
                </div>

                {workSpaceData.color && (
                    <p className="text-xs text-gray-500">
                        선택된 색상: <span style={{ color: workSpaceData.color }}>{workSpaceData.color}</span>
                    </p>
                )}
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
            >
                워크스페이스 생성
            </button>
        </form>
    );
};

export default WorkspaceRegForm;
