"use client";

export default function Multiplicador({ numero }) {
  return (
    <div className="mt-2 bg-zinc-800 p-4 rounded-xl border border-zinc-700 w-full text-center">
      <p className="text-zinc-400 text-sm mb-2">Este componente apenas "escuta" e multiplica</p>
      <p className="text-xl">O valor base é {numero}</p>
      <p className="text-4xl font-bold text-blue-400 mt-2">Dobro: {numero * 2}</p>
    </div>
  );
}
