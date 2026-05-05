import React from 'react';

const PropertyGallery = () => {
  // داتا تجريبية للصور، بعدين هتربطها بالـ Firebase
  const images = [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80", // الصورة الكبيرة
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80", // المطبخ
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80", // الحمام
  ];

  return (
    <section className="relative group">
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-75 md:h-125 rounded-3xl overflow-hidden shadow-soft border border-border/20 transition-colors duration-300">
        
        {/* Main Large Image (Takes 3 columns on desktop) */}
        <div className="md:col-span-3 relative overflow-hidden">
          <img 
            src={images[0]} 
            alt="Main Property" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay for text contrast */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />
          
          {/* Badges on Image */}
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">The Obsidian Villa</h1>
              <p className="text-white/80 text-sm flex items-center gap-1">
                <span className="opacity-70">📍</span> Bel Air, Los Angeles, California
              </p>
            </div>
            <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/30 px-4 py-2 rounded-xl text-sm font-semibold transition-all">
               View All Photos
            </button>
          </div>
        </div>

        {/* Side Smaller Images (Takes 1 column on desktop) */}
        <div className="hidden md:grid grid-rows-2 gap-3">
          <div className="overflow-hidden">
            <img 
              src={images[1]} 
              alt="Interior" 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="overflow-hidden relative">
            <img 
              src={images[2]} 
              alt="Interior" 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyGallery;