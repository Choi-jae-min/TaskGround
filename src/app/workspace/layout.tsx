import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full min-h-screen flex bg-gray-50 text-black">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Topbar />
                <main className=" p-6">{children}</main>
            </div>
        </div>
    );
}
