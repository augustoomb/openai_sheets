"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Transaction = {
    id: string
    value: number
    createdAt?: string
    type: "receita" | "despesa"
    description: String
    email: string
}

export const columns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "createdAt",
        header: "Data",
        cell: ({ getValue }) => {
            const value = getValue() as string | undefined;
            if (!value) return "-";

            const date = new Date(value);
            const formatted = date.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
            });

            return formatted;
        },
    },
    {
        accessorKey: "type",
        header: "Tipo",
    },
    {
        accessorKey: "description",
        header: "Descrição",
    },
]