import React from 'react';

const PropertyMap = ({ lat, lng, zoom = 14 }) => {
  const mapSrc = `https://maps.google.com/maps?q=${lat},${lng}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="h-75 md:h-100 w-full rounded-3xl overflow-hidden border border-border/50 shadow-soft relative transition-colors duration-300">
      <iframe
        title="Property Location"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        src={mapSrc}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default PropertyMap;