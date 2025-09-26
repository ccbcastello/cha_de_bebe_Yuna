
import React, { useState, useEffect, useCallback } from 'react';
import SectionCard from './SectionCard';
import { GiftItem } from './types';
import { getItems, reserveItem } from './giftService';

const GiftSection: React.FC = () => {
  const [items, setItems] = useState<GiftItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [reserverName, setReserverName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isReserving, setIsReserving] = useState(false);

  const loadItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedItems = await getItems();
      setItems(fetchedItems);
    } catch (error) {
      console.error("Failed to load items:", error);
      alert("Não foi possível carregar a lista de presentes.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleReserve = async () => {
    if (!selectedItemId || !reserverName.trim()) {
      alert("Por favor, selecione um item e digite seu nome.");
      return;
    }

    setIsReserving(true);
    try {
      const result = await reserveItem(parseInt(selectedItemId, 10), reserverName);
      if (result.success) {
        alert("Item reservado com sucesso!");
        setSelectedItemId('');
        setReserverName('');
        await loadItems(); // Refresh list
      } else {
        alert(`Erro ao reservar: ${result.error}`);
        await loadItems(); // Refresh list to get latest availability
      }
    } catch (error) {
      console.error("Reservation error:", error);
      alert("Ocorreu um erro na conexão. Tente novamente.");
    } finally {
      setIsReserving(false);
    }
  };

  const selectedItem = items.find(item => item.id === parseInt(selectedItemId, 10));

  return (
    <SectionCard title="Escolha um item para presentear" iconClass="fas fa-gift">
      <p className="text-gray-600 mb-4">Selecione um dos itens abaixo para contribuir com nosso chá. Agradecemos seu carinho!</p>

      <div className="flex items-center mb-4">
        <select
          id="item-select"
          value={selectedItemId}
          onChange={(e) => setSelectedItemId(e.target.value)}
          disabled={isLoading}
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition"
        >
          <option value="">{isLoading ? 'Carregando itens...' : '-- Selecione um item --'}</option>
          {items.map(item => {
            const available = item.totalQuantity - item.reservedBy.length;
            const isAvailable = available > 0;
            return (
              <option key={item.id} value={item.id} disabled={!isAvailable}>
                {item.name} ({isAvailable ? `${available} de ${item.totalQuantity} disponíveis` : 'Esgotado'})
              </option>
            );
          })}
        </select>
        <button onClick={loadItems} className="ml-3 text-gray-500 hover:text-rose-500 transition" title="Atualizar lista">
            <i className={`fas fa-sync-alt ${isLoading ? 'animate-spin' : ''}`}></i>
        </button>
      </div>

      {selectedItem && (
        <div className="bg-rose-50 p-4 rounded-lg border border-rose-100 mt-4">
          <p className="mb-2">Você selecionou: <strong className="text-rose-600">{selectedItem.name}</strong></p>
          <div>
            <label htmlFor="reserver-name" className="block text-sm font-medium text-gray-600 mb-1">Seu nome para confirmar a reserva *</label>
            <input 
              type="text" 
              id="reserver-name" 
              value={reserverName}
              onChange={e => setReserverName(e.target.value)}
              placeholder="Digite seu nome completo"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition" 
            />
          </div>
          <button onClick={handleReserve} disabled={isReserving} className="w-full mt-4 bg-rose-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-rose-600 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:bg-rose-300 flex items-center justify-center">
            {isReserving ? (
                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
                'Reservar Item'
            )}
          </button>
        </div>
      )}
    </SectionCard>
  );
};

export default GiftSection;
