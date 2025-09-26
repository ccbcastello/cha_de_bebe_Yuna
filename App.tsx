
import React from 'react';
import Header from './components/Header';
import InvitationCard from './components/InvitationCard';
import RsvpSection from './components/RsvpSection';
import GiftSection from './components/GiftSection';
import MessageSection from './components/MessageSection';
import LocationSection from './components/LocationSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-rose-50 font-sans text-gray-700">
      <Header />
      <main className="relative z-10 -mt-10 px-4">
        <div className="max-w-3xl mx-auto">
          <InvitationCard />
          <div className="space-y-6">
            <RsvpSection />
            <GiftSection />
            <MessageSection />
            <LocationSection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
