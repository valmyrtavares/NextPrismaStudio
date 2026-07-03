"use client"; // Este é o "Pai" interativo

import { useState } from "react";
import Contador from "./Contador";
import Multiplicador from "./Multiplicador";

export default function PainelInterativo() {
  // A regra de ouro do React: o estado sobe para o pai comum mais próximo!
  // Como o Server Component (page.js) não pode ter estado, nós criamos 
  // este Client Component "Pai" para abraçar os dois filhos.
  const [numero, setNumero] = useState(0);

  return (
    <div className="flex flex-col gap-4 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl w-full max-w-md">
      <h2 className="text-xl font-bold text-center text-white mb-2">Painel de Estado (Client Component)</h2>
      
      {/* O Contador precisa do número e do poder de alterar o número */}
      <Contador numero={numero} setNumero={setNumero} />
      
      {/* O Multiplicador só precisa ler o número, ele não tem botões */}
      <Multiplicador numero={numero} />
    </div>
  );
}
