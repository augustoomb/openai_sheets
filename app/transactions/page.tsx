import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { columns, Transaction } from "@/components/transactions/columns";
import { DataTable } from "@/components/transactions/data-table";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getPrisma } from "@/lib/prisma";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function getData(): Promise<any[]> {

    const result = await getPrisma()
    return result;

}

export default async function TransactionsPage() {

    const session = await getServerSession();

    if (!session) {
        redirect("/login");
    }

    const data = await getData()

    return (
        <SidebarProvider className="flex h-screen">
            <AppSidebar />
            <main className="relative flex flex-col flex-1 items-center justify-center bg-amber-50">
                <h1 className="text-2xl font-bold mb-4">Gerenciador Financeiro</h1>
                <SidebarTrigger className="absolute top-4 left-4 z-10" />
                <DataTable columns={columns} data={data} />
                <Link href={"/api/sheets"} className={buttonVariants({ variant: "default" })}>Exportar CSV</Link>
            </main>
        </SidebarProvider>
    );
}