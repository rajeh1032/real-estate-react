import React from 'react';
import { MapPin } from 'lucide-react';
import { FavoriteButton } from '../../favorites';

const PropertyHeader = ({title,city,price,currency,location,propertyId}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-4 py-6 border-b border-border/50">
      {/* Title & Location */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-text">{title}</h1>
        <div className="flex items-center gap-2 text-text-muted">
          <MapPin size={18} className="text-primary" />
          <span className="text-sm font-medium">{location},{city}</span>
        </div>
      </div>

      {/* Price & Actions */}
      <div className="flex flex-col items-end gap-3 w-full md:w-auto">
        <div className="text-3xl font-bold text-primary">
          {currency} {price}
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-surface hover:bg-border/50 text-text px-4 py-2.5 rounded-xl border border-border transition-all font-semibold text-sm">
            <FavoriteButton propertyId={propertyId} size="small" className="!bg-transparent !backdrop-blur-none hover:!bg-transparent" />
            <span>Add   Favorites</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyHeader;