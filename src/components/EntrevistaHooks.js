"use client";
import React, { useState, useMemo, useCallback, useRef } from "react";

// Componente bobo para ilustrar o useCallback.
// O React.memo diz: "Só me renderize de novo se as minhas propriedades mudarem"
const BotaoPesado = React.memo(({ onClick, children }) => {
  // Isso só vai aparecer no console na primeira vez, graças ao useCallback!
  console.log("🔥 Botão Pesado renderizou!"); 
  return (
    <button onClick={onClick} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-bold w-full mt-2">
      {children}
    </button>
  );
});

// Precisa do displayName por causa do React.memo
BotaoPesado.displayName = "BotaoPesado";

export default function EntrevistaHooks() {
  const [contador, setContador] = useState(0);
  const [texto, setTexto] = useState("");

  // ========================================================
  // 1. useRef: O Fujão da Renderização (A Caixa Forte) 📦
  // ========================================================
  // Ele guarda um valor que NÃO recarrega o componente quando muda.
  // Serve muito para manipular a tela diretamente (como dar foco num input).
  const inputRef = useRef(null); 
  const renderCount = useRef(0);
  
  // Isso muda o valor toda vez, mas não gera looping infinito porque useRef não causa render!
  renderCount.current++;

  // ========================================================
  // 2. useMemo: O Matemático Preguiçoso 🧮
  // ========================================================
  // Evita refazer um cálculo demorado se a dependência (contador) não mudou.
  // Se você digitar no input de texto, o React recarrega a tela, mas PULA essa matemática.
  const calculoPesado = useMemo(() => {
    console.log("🧠 Fazendo cálculo pesado do useMemo...");
    return contador * 9999;
  }, [contador]); // Só recalcula SE o 'contador' mudar

  // ========================================================
  // 3. useCallback: O Guardião de Funções 🛡️
  // ========================================================
  // No React, toda vez que a tela recarrega (ex: digitar no input), todas as funções
  // são recriadas do zero. Isso faria o 'BotaoPesado' se renderizar atoa, pois ele 
  // acharia que recebeu um novo 'onClick'. O useCallback congela a função na memória.
  const handleClick = useCallback(() => {
    setContador((prev) => prev + 1);
  }, []); // Array vazio: essa função NUNCA é recriada na vida deste componente.

  return (
    <div className="p-6 bg-zinc-900 border border-zinc-700 rounded-xl w-full max-w-md mt-8 flex flex-col gap-6 shadow-xl">
      <h2 className="text-2xl font-bold text-yellow-400">Gabarito da Entrevista 📝</h2>
      
      <p className="text-zinc-400 text-sm border-b border-zinc-700 pb-2">
        Vezes que este componente recarregou (Renderizou): <strong className="text-white">{renderCount.current}</strong>
      </p>

      {/* Exemplo 1 */}
      <div className="bg-zinc-800 p-4 rounded border-l-4 border-red-500">
        <h3 className="font-bold text-red-400 mb-2">1. useRef (Acesso DOM)</h3>
        <input 
          ref={inputRef} 
          type="text" 
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Digite qualquer coisa..."
          className="text-black px-3 py-2 rounded w-full mb-2 outline-none"
        />
        <button 
          onClick={() => inputRef.current.focus()} 
          className="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded text-sm w-full"
        >
          Dar Foco no Input (Usando Ref)
        </button>
      </div>

      {/* Exemplo 2 */}
      <div className="bg-zinc-800 p-4 rounded border-l-4 border-blue-500">
        <h3 className="font-bold text-blue-400 mb-2">2. useMemo (Cálculo)</h3>
        <p className="text-zinc-300 text-sm mb-2">
          Abra o terminal (F12) e digite no input acima. O cálculo não se repetirá no console!
        </p>
        <p className="text-xl font-bold bg-black/50 p-2 rounded text-center text-blue-300">
          Resultado: {calculoPesado}
        </p>
      </div>

      {/* Exemplo 3 */}
      <div className="bg-zinc-800 p-4 rounded border-l-4 border-green-500">
        <h3 className="font-bold text-green-400 mb-2">3. useCallback (Função)</h3>
        <p className="text-zinc-300 text-sm">
          Este botão é Memoizado. A função de clique dele foi congelada na memória.
        </p>
        <BotaoPesado onClick={handleClick}>
          Incrementar Contador ({contador})
        </BotaoPesado>
      </div>
    </div>
  );
}
