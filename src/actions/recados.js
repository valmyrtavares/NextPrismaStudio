"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function salvarRecado(formData) {
  const texto = formData.get("texto");
  if (!texto) return;

  await prisma.recado.create({
    data: { texto },
  });

  // Mágica do Next: Avisa a página que o banco mudou para ela recarregar os dados!
  revalidatePath("/");
}
