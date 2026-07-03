export default function Contador({ numero, setNumero }) {
  return (
    <div className="flex flex-col items-center gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800 w-full">
      <p className="text-zinc-400 text-sm">Controle Principal</p>
      
      <div className="flex items-center gap-6">
        <button 
          onClick={() => setNumero(numero - 1)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          - Menos
        </button>

        <span className="text-4xl font-bold w-12 text-center text-white">
          {numero}
        </span>

        <button 
          onClick={() => setNumero(numero + 1)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Mais +
        </button>
      </div>
    </div>
  );
}
