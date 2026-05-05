
import React from 'react';

const PropertyMap = ({ address }) => {
  // بنعمل encode للعنوان عشان ينفع يتحط في الـ URL
  const encodedAddress = encodeURIComponent(address || "Bel Air, Los Angeles, California");
  const mapSrc = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

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