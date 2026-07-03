import { create } from 'zustand';

// Aqui nós criamos uma "Lojinha" (Store) que vive FORA da árvore do React.
// Qualquer componente, em qualquer lugar, pode ler ou alterar isso.
export const useContadorStore = create((set) => ({
  numeroGlobal: 0,
  aumentar: () => set((state) => ({ numeroGlobal: state.numeroGlobal + 1 })),
  diminuir: () => set((state) => ({ numeroGlobal: state.numeroGlobal - 1 })),
}));
