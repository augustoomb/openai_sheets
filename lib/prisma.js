'use server'

import { PrismaClient } from '@/generated/prisma';
import { getServerSession } from "next-auth";

const prisma = new PrismaClient()

export async function createPrisma(arrData) {

  try {

    const session = await getServerSession();

    if (!session || !session.user?.email) {
      throw new Error("Usuário não autenticado");
    }

    arrData.forEach(async (item) => {
      if (item.valor && item.tipo && item.descrição) {
        await prisma.transaction.create({
          data: {
            value: parseFloat(item.valor),
            type: item.tipo,
            description: item.descrição,
            email: session.user.email
          },
        });
      } else {
        console.error("Dados inválidos:", item);
      }
    });

    return { sucess: true, message: "Transação criada com sucesso" };
  } catch (error) {
    return { sucess: false, message: error.message || "Erro desconhecido ao criar transação no Prisma" };
  }
}

export async function getPrisma() {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      throw new Error("Usuário não autenticado");
    }

    const transactions = await prisma.transaction.findMany({
      where: { email: session.user.email, createdAt: { gte: new Date(new Date().setDate(new Date().getMonth() + 1)) } },
      orderBy: { createdAt: 'desc' },
    });

    return transactions;
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    return [];
  }
}
