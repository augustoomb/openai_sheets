import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SpendingCard } from "@/components/home/spending-card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {

    const session = await getServerSession();

    if (!session) {
        redirect("/login");
    }

    return (
        <SidebarProvider className="flex h-screen">
            <AppSidebar />
            <main className="relative flex flex-col flex-1 items-center justify-center bg-amber-50">
                <h1 className="text-2xl font-bold mb-4">Gerenciador Financeiro</h1>
                <SidebarTrigger className="absolute top-4 left-4 z-10" />
                <SpendingCard session={session} />
            </main>
        </SidebarProvider>
    );
}
