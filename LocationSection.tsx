
import React from 'react';
import SectionCard from './SectionCard';

const LocationSection: React.FC = () => {
    const address = "Rua São João del Rei, 430, Bosque dos Eucaliptos, São José dos Campos, SP";
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    const embedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.992224168285!2d-45.89433432489816!3d-23.24294017899478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cc4a9f3d62b5c3%3A0x44421f6b153e7c05!2sR.%20S%C3%A3o%20Jo%C3%A3o%20Del%20Rei%2C%20430%20-%20Bosque%20dos%20Eucaliptos%2C%20S%C3%A3o%20Jos%C3%A9%20dos%20Campos%20-%20SP%2C%2012233-190!5e0!3m2!1spt-BR!2sbr!4v1715878893123!5m2!1spt-BR!2sbr";

    return (
        <SectionCard title="Localização" iconClass="fas fa-map-marker-alt">
            <div className="text-gray-700">
                <div className="font-semibold text-purple-800 text-lg">Salão de Festas</div>
                <div className="location-address mt-1 space-y-px">
                    <div>Rua São João del Rei, 430</div>
                    <div>Bosque dos Eucaliptos</div>
                    <div>São José dos Campos - SP</div>
                </div>
            </div>

            <div className="map-container mt-6 h-64 rounded-xl overflow-hidden bg-gray-200">
                <iframe 
                    src={embedUrl}
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={false} 
                    loading="lazy"
                    title="Event Location"
                ></iframe>
            </div>

            <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-rose-600 font-semibold hover:text-rose-700 transition">
                <i className="fas fa-directions mr-2"></i>Abrir no Google Maps
            </a>
        </SectionCard>
    );
};

export default LocationSection;
