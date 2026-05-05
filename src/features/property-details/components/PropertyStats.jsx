import React from 'react';
import { Bed, Bath, Maximize, Car } from 'lucide-react'; // هستخدم Lucide icons لأنها Clean جداً

const StatItem = ({ icon: Icon, label, value }) => (
  <div className="bg-card border border-border/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm transition-all hover:shadow-soft hover:border-primary/30 group">
    <div className="bg-surface p-3 rounded-xl mb-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
      <Icon size={24} strokeWidth={1.5} />
    </div>
    <span className="text-xl font-bold text-text leading-none">{value}</span>
    <span className="text-[10px] uppercase tracking-widest text-text-muted mt-2 font-semibold">
      {label}
    </span>
  </div>
);

const PropertyStats = () => {
  const stats = [
    { icon: Bed, label: 'Bedrooms', value: '6' },
    { icon: Bath, label: 'Bathrooms', value: '8.5' },
    { icon: Maximize, label: 'Sq Ft', value: '9,420' },
    { icon: Car, label: 'Cars', value: '4' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
      {stats.map((stat, index) => (
        <StatItem key={index} {...stat} />
      ))}
    </div>
  );
};

export default PropertyStats;