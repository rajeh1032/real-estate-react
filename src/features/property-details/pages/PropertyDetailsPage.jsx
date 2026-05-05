import React from 'react';
import PropertyGallery from '../components/PropertyGallery';
import PropertyHeader from '../components/PropertyHeader';
import PropertyStats from '../components/PropertyStats';
import ContactAgentForm from '../components/ContactAgentForm';
import PropertyInfoTable from '../components/PropertyInfoTable';
import PropertyMap from '../components/PropertyMap';

const PropertyDetails = () => {
  return (
    <main className="min-h-screen bg-background text-text p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section: Details */}
        <div className="lg:col-span-2 space-y-8">
          <PropertyGallery />
          <PropertyHeader />
          <PropertyStats />

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Architectural Vision</h2>
            <p className="text-text-muted leading-relaxed">
              Designed by renowned architect Marcus Vane... (الوصف هنا)
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Prime Location</h2>
            <div className="rounded-2xl overflow-hidden h-64 bg-surface">
              {/* هنا هتحط الخريطة لاحقاً */}
              <PropertyMap />
            </div>
          </section>
        </div>

        {/* Right Section: Sidebar */}
        <div className="space-y-6">
          <ContactAgentForm />
          <PropertyInfoTable />
        </div>
      </div>
    </main>
  );
};

export default PropertyDetails;
