
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-rose-400 to-purple-500 text-white text-center py-10 md:py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-repeat bg-center opacity-10" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100\"%3E%3Cpath fill=\"%23ffffff\" d=\"M30,30 Q50,10 70,30 T100,50 T70,70 T30,70 T0,50 T30,30 Z\"/%3E%3C/svg%3E')", backgroundSize: '200px'}}></div>
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Dancing Script', cursive" }}>Chá da Yuna Louise</h1>
      </div>
    </header>
  );
};

export default Header;
