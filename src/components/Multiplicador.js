"use client";

import { useContadorStore } from "../store/contadorStore";

export default function Multiplicador() {
  // Puxando APENAS o número da nuvem. Ele nem recebe props mais!
  const numero = useContadorStore((state) => state.numeroGlobal);

  return (
    <div className="mt-2 bg-zinc-800 p-4 rounded-xl border border-zinc-700 w-full max-w-sm text-center">
      <p className="text-zinc-400 text-sm mb-2">Multiplicador Órfão (Lê da Nuvem)</p>
      <p className="text-xl">O valor base é {numero}</p>
      <p className="text-4xl font-bold text-blue-400 mt-2">Dobro: {numero * 2}</p>
    </div>
  );
}
