import PainelInterativo from "../components/PainelInterativo";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-zinc-950 text-white">
      <h1 className="text-4xl font-bold mb-4">Bobagem Aleatória 🚀</h1>
      <p className="text-lg text-zinc-400 mb-8 text-center max-w-lg">
        Este é o nosso Server Component (A Cozinha). Ele entregou todo o HTML pronto. 
        Logo abaixo, temos nosso Painel que gerencia os filhos.
      </p>

      {/* Injetando nosso "Pai" Client Component aqui dentro */}
      <PainelInterativo />
    </div>
  );
}
