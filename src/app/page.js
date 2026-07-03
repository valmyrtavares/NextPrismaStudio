import Contador from "../components/Contador";
import Multiplicador from "../components/Multiplicador";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-24 bg-zinc-950 text-white">
      <h1 className="text-4xl font-bold">Bobagem Aleatória 🚀</h1>
      <p className="text-lg text-zinc-400 text-center max-w-lg">
        Este é o Server Component. Aqui estão nossos dois Client Components soltos ("órfãos"), 
        mas eles continuam conversando através da nuvem (Zustand)!
      </p>

      {/* Estão soltos no Server Component, sem um Pai Client! */}
      <Contador />
      <Multiplicador />
    </div>
  );
}
