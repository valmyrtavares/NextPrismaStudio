import { PrismaClient } from "@prisma/client";
import FormularioRecado from "../components/FormularioRecado";
import EntrevistaHooks from "../components/EntrevistaHooks";

const prisma = new PrismaClient();

export default async function Home() {
  let recados = [];
  try {
    // Busca no banco de dados SQLite local
    recados = await prisma.recado.findMany({
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    // Isso vai evitar que a tela quebre enquanto o Prisma não estiver totalmente instalado
    console.log("Banco de dados ainda não está pronto:", error.message);
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-24 bg-zinc-950 text-white">
      <h1 className="text-4xl font-bold">Mural de Recados 📝</h1>
      <p className="text-lg text-zinc-400 text-center max-w-lg mt-4">
        Os recados abaixo estão salvos no banco de dados SQLite local.
      </p>

      {/* Nosso formulário interativo */}
      <FormularioRecado />

      {/* O GABARITO DA SUA ENTREVISTA DE REACT */}
      <EntrevistaHooks />

      <div className="mt-8 w-full max-w-md flex flex-col gap-4">
        {recados.map((recado) => (
          <div key={recado.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
            <p className="text-lg">{recado.texto}</p>
            <p className="text-xs text-zinc-500 mt-2">
              {new Date(recado.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
        
        {recados.length === 0 && (
          <p className="text-zinc-500 text-center italic mt-8">Nenhum recado ainda.</p>
        )}
      </div>
    </div>
  );
}
