import React from 'react';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <div>
            <h1 className="text-2xl font-bold">워크스페이스 대시보드</h1>
            <p className="mt-2 text-gray-600">현재 workspace ID: {id}</p>
        </div>
    );
}