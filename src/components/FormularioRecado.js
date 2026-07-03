"use client";
import { useRef } from "react";
import { salvarRecado } from "../actions/recados";

export default function FormularioRecado() {
  const formRef = useRef(null);

  return (
    <form 
      action={async (formData) => {
        await salvarRecado(formData);
        formRef.current?.reset(); // Limpa o campo após salvar
      }} 
      ref={formRef}
      className="flex gap-2 w-full max-w-md mt-8"
    >
      <input 
        type="text" 
        name="texto"
        placeholder="Escreva um recado..." 
        className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white"
        required
      />
      <button 
        type="submit" 
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        Salvar
      </button>
    </form>
  );
}
