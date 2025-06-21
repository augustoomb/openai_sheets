import { NextResponse } from "next/server";
import { PrismaClient } from '@/generated/prisma';
import { Parser } from "json2csv";

export async function GET() {
    const prisma = new PrismaClient()

    try {
        const data = await prisma.transaction.findMany();

        const parser = new Parser();
        const csv = parser.parse(data);

        return new NextResponse(csv, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": "attachment; filename=export.csv",
            },
        });
    } catch (error) {
        console.error(error);
        return new NextResponse("Erro ao exportar dados", { status: 500 });
    }
}
