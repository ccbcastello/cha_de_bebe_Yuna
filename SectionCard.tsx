
import React from 'react';

interface SectionCardProps {
  title: string;
  iconClass: string;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, iconClass, children }) => {
  return (
    <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
      <h2 className="flex items-center text-xl font-semibold text-purple-800 mb-6 pb-3 border-b border-gray-100">
        <i className={`${iconClass} mr-3 text-2xl text-purple-600`}></i>
        {title}
      </h2>
      {children}
    </section>
  );
};

export default SectionCard;
