'use client';

import { getPrisma } from "@/lib/prisma";
import { useEffect, useState } from "react";
import { SpendingForm } from "@/components/home/spending-form";

export function SpendingCard({ session }: any) {

    const [data, setData] = useState([] as any[]);
    const [loading, setLoading] = useState(true);

    async function fetchData() {
        setLoading(true);
        const result = await getPrisma()
        setData(result);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);


    const totalExpense = data.reduce((acc, item) => {
        if (item.type === 'despesa') {
            return acc + item.value;
        }
        return acc;
    }, 0);

    const totalIncome = data.reduce((acc, item) => {
        if (item.type === 'receita') {
            return acc + item.value;
        }
        return acc;
    }, 0);

    return (
        <div className="flex w-full max-w-4xl h-[80vh] rounded-2xl overflow-hidden shadow-xl">

            <div
                className="w-1/2 bg-cover bg-center"
                style={{ backgroundImage: 'url(/imagem.jpg)' }}
            >
                <div className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center">
                    <h1 className="text-white text-3xl font-bold">Olá {session?.user?.name}</h1>
                    <div>
                        {loading ? <p className="text-white">Carregando...</p> : (
                            <>
                                <p className="text-white">Este mês você já gastou: R$ {totalExpense}</p>
                                <p className="text-white">Este mês você já recebeu: R$ {totalIncome}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <SpendingForm onSubmitSuccess={fetchData} />
        </div>
    )
}
