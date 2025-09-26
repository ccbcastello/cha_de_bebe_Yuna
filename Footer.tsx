
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 py-8 bg-gray-100 rounded-t-2xl">
      <div className="container mx-auto text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Chá da Yuna. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
