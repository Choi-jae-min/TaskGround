import MemberForm from "@/app/workspace/[id]/members/memberForm";
export default function MembersPage() {
    return (
        <div className={'min-h-screen bg-slate-950 p-6 rounded-xl'}>
            <h1 className="text-2xl font-bold">멤버 관리</h1>
            <p className="mt-1 text-sm text-slate-300">
                워크스페이스 멤버를 초대하고 권한을 관리하세요.
            </p>
            <MemberForm/>
        </div>
    );
}
