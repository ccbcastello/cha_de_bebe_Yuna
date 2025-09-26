
import React, { useState, useCallback } from 'react';
import SectionCard from './SectionCard';
import { RsvpStatus } from './types';
import { confirmAttendance } from './giftService';

const RsvpSection: React.FC = () => {
  const [status, setStatus] = useState<RsvpStatus>(RsvpStatus.Yes);
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('JORGE ALBERTO IWASAKI CASTELLO');
  const [email, setEmail] = useState('cobcastello@gmail.com');
  const [isLoading, setIsLoading] = useState(false);

  const handleGuestChange = (amount: number) => {
    setGuests(prev => {
      const newCount = prev + amount;
      if (newCount >= 1 && newCount <= 10) {
        return newCount;
      }
      return prev;
    });
  };

  const handleSubmit = async () => {
      if (!name || !email) {
          alert('Por favor, preencha seu nome e email.');
          return;
      }
      setIsLoading(true);
      try {
          const result = await confirmAttendance({ name, email, guests, confirmation: status });
          if(result.success) {
            alert('Presença confirmada com sucesso!');
          } else {
            throw new Error('API returned success: false');
          }
      } catch (error) {
          alert('Ocorreu um erro ao confirmar a presença. Tente novamente.');
          console.error(error);
      } finally {
          setIsLoading(false);
      }
  };

  const RsvpButton = useCallback<React.FC<{ value: RsvpStatus }>>(({ value }) => (
    <button
      onClick={() => setStatus(value)}
      className={`flex-1 w-full max-w-xs py-3 px-4 border-2 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 ${
        status === value
          ? 'bg-teal-500 border-teal-500 text-white shadow-md'
          : 'bg-white border-gray-200 text-gray-600 hover:border-teal-400'
      }`}
    >
      {value}
    </button>
  ), [status]);

  return (
    <SectionCard title="Confirmação de Presença" iconClass="fas fa-calendar-check">
      <div className="flex flex-col md:flex-row justify-center gap-3 mb-6">
        <RsvpButton value={RsvpStatus.Yes} />
        <RsvpButton value={RsvpStatus.Maybe} />
        <RsvpButton value={RsvpStatus.No} />
      </div>

      <div className={`text-center mb-6 transition-opacity duration-500 ${status === RsvpStatus.No ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        <label className="block text-gray-600 mb-2">Total de convidados (incluindo você)</label>
        <div className="flex items-center justify-center">
          <button onClick={() => handleGuestChange(-1)} className="w-10 h-10 rounded-full border border-gray-300 bg-white text-lg font-bold text-gray-600 transition hover:bg-gray-50">-</button>
          <span className="w-12 text-center text-lg font-semibold">{guests}</span>
          <button onClick={() => handleGuestChange(1)} className="w-10 h-10 rounded-full border border-gray-300 bg-white text-lg font-bold text-gray-600 transition hover:bg-gray-50">+</button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">Nome *</label>
          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition text-gray-800" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email *</label>
          <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition text-gray-800" />
        </div>
      </div>

      <button onClick={handleSubmit} disabled={isLoading} className="w-full mt-6 bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-300 flex items-center justify-center">
        {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
            <><i className="fas fa-check-circle mr-2"></i>Confirmar Presença</>
        )}
      </button>
    </SectionCard>
  );
};

export default RsvpSection;
