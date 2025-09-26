import React from 'react';

// Using a reliable public URL for the image to ensure it loads correctly everywhere.
const invitationImageUrl = "https://i.imgur.com/8Q9g2d3.png";

const InvitationCard: React.FC = () => {
  return (
    <div className="flex justify-center mb-6">
      <div className="invitation-card max-w-sm text-center">
        <img 
          src={invitationImageUrl} 
          alt="Convite Chá da Yuna Louise" 
          className="w-full rounded-2xl shadow-xl"
        />
      </div>
    </div>
  );
};

export default InvitationCard;
