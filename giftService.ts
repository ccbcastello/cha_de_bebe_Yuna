
import { GiftItem } from './types';

let mockItems: GiftItem[] = [
  { id: 1, name: 'Pacote de Fraldas P (40 unidades)', totalQuantity: 10, reservedBy: [] },
  { id: 2, name: 'Pacote de Fraldas M (30 unidades)', totalQuantity: 20, reservedBy: [] },
  { id: 3, name: 'Pacote de Fraldas G (25 unidades)', totalQuantity: 15, reservedBy: [] },
  { id: 4, name: 'Lenços Umedecidos (pacote com 100)', totalQuantity: 25, reservedBy: ['Ana Silva'] },
  { id: 5, name: 'Pomada para Assaduras', totalQuantity: 10, reservedBy: [] },
  { id: 6, name: 'Body Manga Curta (Tamanho RN)', totalQuantity: 8, reservedBy: [] },
  { id: 7, name: 'Body Manga Longa (Tamanho P)', totalQuantity: 8, reservedBy: ['Carlos Souza'] },
  { id: 8, name: 'Manta de Bebê', totalQuantity: 5, reservedBy: [] },
  { id: 9, name: 'Kit Mamadeiras', totalQuantity: 3, reservedBy: ['Mariana Costa', 'Pedro Almeida'] },
  { id: 10, name: 'Toalha de Banho com Capuz', totalQuantity: 6, reservedBy: [] },
  { id: 11, name: 'Sabonete Líquido Neutro', totalQuantity: 12, reservedBy: [] },
  { id: 12, name: 'Cadeira de Descanso para Bebê', totalQuantity: 1, reservedBy: ['Família Oliveira'] },
];

export const getItems = (): Promise<GiftItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(JSON.parse(JSON.stringify(mockItems))); // Return a deep copy
    }, 500);
  });
};

export const reserveItem = (itemId: number, name: string): Promise<{ success: boolean; error?: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const item = mockItems.find(i => i.id === itemId);
      if (!item) {
        resolve({ success: false, error: 'Item não encontrado.' });
        return;
      }
      if (item.reservedBy.length >= item.totalQuantity) {
        resolve({ success: false, error: 'Este item já atingiu o limite de reservas.' });
        return;
      }
      item.reservedBy.push(name);
      resolve({ success: true });
    }, 1000);
  });
};

// Simulate other API calls for completeness
export const confirmAttendance = (data: any): Promise<{ success: boolean }> => {
    console.log("Confirming attendance:", data);
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 1000));
}

export const sendMessage = (data: any): Promise<{ success: boolean }> => {
    console.log("Sending message:", data);
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 1000));
}
