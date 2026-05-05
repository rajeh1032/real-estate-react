import React from 'react';
import { Heart, MapPin, Share2 } from 'lucide-react';

const PropertyHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-4 py-6 border-b border-border/50">
      {/* Title & Location */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-text">The Obsidian Villa</h1>
        <div className="flex items-center gap-2 text-text-muted">
          <MapPin size={18} className="text-primary" />
          <span className="text-sm font-medium">Bel Air, Los Angeles, California</span>
        </div>
      </div>

      {/* Price & Actions */}
      <div className="flex flex-col items-end gap-3 w-full md:w-auto">
        <div className="text-3xl font-bold text-primary">
          $12,450,000
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-surface hover:bg-border/50 text-text px-4 py-2.5 rounded-xl border border-border transition-all font-semibold text-sm">
            <Heart size={18} />
            Add to Favorites
          </button>
          <button className="p-2.5 bg-surface hover:bg-border/50 text-text rounded-xl border border-border transition-all">
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyHeader;