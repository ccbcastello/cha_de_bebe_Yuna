
import React, { useState } from 'react';
import SectionCard from './SectionCard';
import { sendMessage } from './giftService';


const MessageSection: React.FC = () => {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const maxLength = 250;

    const handleSendMessage = async () => {
        if (!message.trim()) {
            alert('Por favor, escreva uma mensagem.');
            return;
        }
        setIsLoading(true);
        try {
            await sendMessage({ message });
            alert('Mensagem enviada com sucesso!');
            setMessage('');
        } catch (error) {
            alert('Ocorreu um erro ao enviar a mensagem.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SectionCard title="Deixe uma mensagem" iconClass="fas fa-comment">
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-600 mb-1">Sua mensagem</label>
                <textarea
                    id="message"
                    rows={4}
                    maxLength={maxLength}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Deixe uma mensagem carinhosa para os pais..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
                ></textarea>
                <div className="text-right text-sm text-gray-500 mt-1">
                    {message.length}/{maxLength}
                </div>
            </div>
            <button onClick={handleSendMessage} disabled={isLoading} className="w-full mt-4 bg-rose-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-rose-600 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:bg-rose-300 flex items-center justify-center">
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    <><i className="fas fa-paper-plane mr-2"></i>Enviar Mensagem</>
                )}
            </button>
        </SectionCard>
    );
}

export default MessageSection;
