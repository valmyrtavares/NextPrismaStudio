"use client";

import { useContadorStore } from "../store/contadorStore";

export default function Contador() {
  // Puxando o número e as funções diretamente da nossa "Nuvem" global
  const numero = useContadorStore((state) => state.numeroGlobal);
  const aumentar = useContadorStore((state) => state.aumentar);
  const diminuir = useContadorStore((state) => state.diminuir);

  return (
    <div className="flex flex-col items-center gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800 w-full max-w-sm">
      <p className="text-zinc-400 text-sm">Contador Órfão (Lê da Nuvem)</p>
      
      <div className="flex items-center gap-6">
        <button 
          onClick={diminuir}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          - Menos
        </button>

        <span className="text-4xl font-bold w-12 text-center text-white">
          {numero}
        </span>

        <button 
          onClick={aumentar}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Mais +
        </button>
      </div>
    </div>
  );
}
