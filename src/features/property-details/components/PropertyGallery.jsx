import React from 'react';

const PropertyGallery = ({ images, image, location, city, title }) => {
  return (
    <section className="relative group">
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-75 md:h-125 rounded-3xl overflow-hidden shadow-soft border border-border/20 transition-colors duration-300">
        {/* Main Large Image (Takes 3 columns on desktop) */}
        <div className="md:col-span-3 relative overflow-hidden">
          <img
            src={image}
            alt="Main Property"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay for text contrast */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />

          {/* Badges on Image */}
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
                {title}
              </h1>
              <p className="text-white/80 text-sm flex items-center gap-1">
                <span className="opacity-70">📍</span> {location}, {city}
              </p>
            </div>
          </div>
        </div>

        {/* Side Smaller Images (Takes 1 column on desktop) */}
        <div className="hidden md:grid grid-rows-2 gap-3">
          {images.map((item, index) => {
            return (
              // كلمة return دي هي اللي ناقصاك
              <div key={index} className="overflow-hidden relative">
                <img
                  src={item}
                  alt="Interior"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PropertyGallery;
