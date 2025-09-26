
import React from 'react';

const InvitationCard: React.FC = () => {
  return (
    <div className="flex justify-center mb-6">
      <div className="invitation-card max-w-sm text-center">
        <img 
          src="./cartao.png" 
          alt="Convite Chá da Yuna Louise" 
          className="w-full rounded-2xl shadow-xl"
        />
      </div>
    </div>
  );
};

export default InvitationCard;
