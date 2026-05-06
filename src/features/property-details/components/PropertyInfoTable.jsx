import React from 'react';

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-3 border-b border-border/30 last:border-0">
    <span className="text-text-muted text-sm font-medium">{label}</span>
    <span className="text-text text-sm font-bold">{value}</span>
  </div>
);

const PropertyInfoTable = ({ conciergeDetails }) => {
  const details = [
    { label: 'Listing ID', value: conciergeDetails.listingId },
    { label: 'Built In', value:`${ conciergeDetails.builtIn}` },
    { label: 'Property Tax', value: `${conciergeDetails.propertyTax} / yr` },
    { label: 'HOA Fees', value: `'${conciergeDetails.hoaFees} / mo'` },
  ];

  return (
    <div className="bg-surface/50 rounded-3xl p-6 border border-border/50 transition-colors duration-300">
      <h3 className="font-bold text-lg mb-4 text-text">Concierge Details</h3>
      <div className="flex flex-col">
        {details.map((detail, index) => (
          <InfoRow key={index} label={detail.label} value={detail.value} />
        ))}
      </div>
    </div>
  );
};

export default PropertyInfoTable;
