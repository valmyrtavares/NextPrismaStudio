import Link from 'next/link';

export default function Planetas() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-black text-white overflow-hidden">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        Mergulhando nos SVGs 🪐
      </h1>
      <p className="text-zinc-400 max-w-lg text-center mb-12">
        Abaixo, você vê o resultado de desenhar formas geométricas usando matemática pura. O SVG não é uma "foto", é código que o navegador pinta em tempo real!
      </p>

      {/* O Palco Espacial */}
      <div className="relative w-96 h-96 flex items-center justify-center rounded-full bg-zinc-950 shadow-[0_0_100px_rgba(234,179,8,0.05)] border border-zinc-900">

        {/* A Mágica do SVG (Scalable Vector Graphics) */}
        <svg viewBox="0 0 400 400" className="w-full h-full animate-[spin_20s_linear_infinite]">
          {/* DEFS (Definições): Onde guardamos nossos efeitos especiais para usar depois */}
          <defs>
            {/* 1. Gradiente Esférico para o Planeta (Efeito 3D) */}
            <radialGradient id="gradiente-planeta" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#60a5fa" /> {/* Azul claro batendo a luz */}
              <stop offset="60%" stopColor="#1e3a8a" /> {/* Azul escuro na transição */}
              <stop offset="100%" stopColor="#020617" /> {/* Sombra negra absoluta */}
            </radialGradient>

            {/* 2. Gradiente do Sol */}
            <radialGradient id="gradiente-sol" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="20%" stopColor="#fef08a" />
              <stop offset="80%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#7c2d12" />
            </radialGradient>

            {/* 3. Filtro de Brilho (Glow) estilo "Neon" */}
            <filter id="brilho-solar" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* === A PINTURA COMEÇA AQUI === */}

          {/* O SOL: Um círculo exato no meio (x=200, y=200) com brilho */}
          <circle
            cx="200"
            cy="200"
            r="45"
            fill="url(#gradiente-sol)"
            filter="url(#brilho-solar)"
          />

          {/* A ÓRBITA DO PLANETA: Um círculo vazado (sem fundo, só borda pontilhada) */}
          <circle
            cx="200"
            cy="200"
            r="130"
            fill="none"
            stroke="#334155"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />

          {/* O PLANETA: Desenhado em cima da linha da órbita (x=330, y=200) */}
          <circle
            cx="330"
            cy="200"
            r="18"
            fill="url(#gradiente-planeta)"
          />

          {/* A LUA: Pequenina, perto do planeta */}
          <circle
            cx="355"
            cy="200"
            r="4"
            fill="#e2e8f0"
          />
        </svg>

      </div>

      <Link href="/" className="mt-16 text-blue-400 hover:underline">
        Voltar para o Mural
      </Link>
    </div>
  );
}
