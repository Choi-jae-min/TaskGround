export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {/* 상단 네비게이션 */}
            <header className="border-b bg-white/80 backdrop-blur-sm">
                <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#8B5CF6] flex items-center justify-center text-white text-sm font-bold">
                            TG
                        </div>
                        <span className="font-semibold text-sm sm:text-base">TaskGround</span>
                    </div>

                    <nav className="flex items-center gap-3 text-sm">
                        <a href="#features" className="hidden sm:inline text-gray-600 hover:text-gray-900">
                            기능 소개
                        </a>
                        <a href="#how-it-works" className="hidden sm:inline text-gray-600 hover:text-gray-900">
                            어떻게 쓰나요?
                        </a>
                        <div className="h-5 w-px bg-gray-200 hidden sm:block" />
                        <a
                            href="/auth/login"
                            className="text-gray-600 hover:text-gray-900 px-3 py-1 rounded-md text-sm"
                        >
                            로그인
                        </a>
                        <a
                            href="/auth/register"
                            className="bg-[#8B5CF6] text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-[#7C3AED] transition"
                        >
                            회원가입
                        </a>
                    </nav>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-4 pt-12 pb-20">
                <section className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-3 py-1 text-xs font-medium text-[#8B5CF6]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                            워크스페이스 기반 협업 도구
                        </div>

                        <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                            팀의 작업을 <span className="text-[#8B5CF6]">한 곳에서</span>
                            <br />
                            정리하고 공유하세요.
                        </h1>

                        <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-xl">
                            여러 프로젝트, 흩어진 업무, 복잡한 커뮤니케이션.
                            <br className="hidden sm:block" />
                            TaskGround 워크스페이스에서 보드, 멤버, 권한을 한 번에 관리해보세요.
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <a
                                href="/auth/signup"
                                className="inline-flex items-center justify-center rounded-md bg-[#8B5CF6] px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#7C3AED] transition"
                            >
                                지금 시작하기
                            </a>
                            <a
                                href="/auth/login"
                                className="inline-flex items-center justify-center rounded-md border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                            >
                                이미 계정이 있어요
                            </a>
                        </div>

                        <p className="mt-3 text-xs text-gray-500">
                            ✦ 회원가입 후 바로 워크스페이스를 만들고 팀원을 초대할 수 있어요.
                        </p>
                    </div>

                    <div className="relative">
                        <div className="absolute -top-6 -right-4 w-24 h-24 rounded-full bg-purple-100 blur-3xl opacity-70 pointer-events-none" />
                        <div className="absolute bottom-0 -left-10 w-28 h-28 rounded-full bg-indigo-100 blur-3xl opacity-60 pointer-events-none" />

                        <div className="relative border rounded-2xl bg-white shadow-sm p-4 sm:p-5">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-xs text-gray-400">현재 워크스페이스</p>
                                    <p className="text-sm font-semibold">Smartel Dev Team</p>
                                </div>
                                <span className="rounded-full bg-purple-50 px-3 py-1 text-[11px] font-medium text-[#8B5CF6]">
                  5 members
                </span>
                            </div>

                            <div className="border rounded-xl bg-gray-50 p-3 mb-3">
                                <p className="text-xs font-medium text-gray-500 mb-2">
                                    진행 중인 프로젝트
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-xs">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                            <span className="font-medium text-gray-800">
                        관리자 리뉴얼
                      </span>
                                        </div>
                                        <span className="text-[11px] text-gray-400">In progress</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-xs">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                                            <span className="font-medium text-gray-800">
                        워크스페이스 기능 설계
                      </span>
                                        </div>
                                        <span className="text-[11px] text-gray-400">Review</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-xs">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-slate-300" />
                                            <span className="font-medium text-gray-800">
                        신규 프로젝트 아이디어
                      </span>
                                        </div>
                                        <span className="text-[11px] text-gray-400">Backlog</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex -space-x-2">
                                    <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-[11px] font-semibold">
                                        JM
                                    </div>
                                    <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-[11px] font-semibold">
                                        YK
                                    </div>
                                    <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-[11px] font-semibold">
                                        +3
                                    </div>
                                </div>
                                <button className="text-[11px] text-gray-500 hover:text-gray-800">
                                    워크스페이스 살펴보기 →
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features" className="mt-16 space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900">TaskGround로 할 수 있는 것들</h2>
                    <div className="grid gap-4 sm:grid-cols-3 text-sm">
                        <div className="rounded-xl border bg-white p-4">
                            <p className="text-xs font-medium text-[#8B5CF6] mb-1">워크스페이스</p>
                            <p className="font-semibold mb-1">팀별 공간 분리</p>
                            <p className="text-xs text-gray-500">
                                팀이나 프로젝트 단위로 워크스페이스를 나누고, 멤버를 초대해 권한을 관리할 수 있어요.
                            </p>
                        </div>
                        <div className="rounded-xl border bg-white p-4">
                            <p className="text-xs font-medium text-[#8B5CF6] mb-1">프로젝트</p>
                            <p className="font-semibold mb-1">프로젝트 카드 관리</p>
                            <p className="text-xs text-gray-500">
                                진행 중인 작업들을 프로젝트 카드로 정리해서, 한 눈에 현재 상태를 파악해요.
                            </p>
                        </div>
                        <div className="rounded-xl border bg-white p-4">
                            <p className="text-xs font-medium text-[#8B5CF6] mb-1">멤버</p>
                            <p className="font-semibold mb-1">권한 & 초대 관리</p>
                            <p className="text-xs text-gray-500">
                                멤버별 권한을 설정하고, 초대/제거를 간단한 UI로 처리할 수 있습니다.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
