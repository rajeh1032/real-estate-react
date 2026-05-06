import React, { useEffect, useState } from 'react';
import PropertyGallery from '../components/PropertyGallery';
import PropertyHeader from '../components/PropertyHeader';
import PropertyStats from '../components/PropertyStats';
import ContactAgentForm from '../components/ContactAgentForm';
import PropertyInfoTable from '../components/PropertyInfoTable';
import PropertyMap from '../components/PropertyMap';
import { useParams } from 'react-router-dom';
import { getDocumentById } from '../../../firebase/firestoreHelper';

export const PropertyDetailsPage = () => {
  const { propertyId } = useParams(); // بناخد الـ ID من الـ URL (مثلاً /property/prop_001)
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (propertyId) {
          setLoading(true);
          console.log(propertyId);
          const data = await getDocumentById('properties', propertyId);
          setProperty(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) fetchData();
  }, [propertyId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-danger">
        <p>Error: {error}</p>
      </div>
    );

  return (
    <main className="min-h-screen bg-background text-text p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section: Details */}
        <div className="lg:col-span-2 space-y-8">
          <PropertyGallery
            city={property.city}
            location={property.location}
            title={property.title}
            images={property.images}
            image={property.image}
          />
          <PropertyHeader
            title={property.title}
            city={property.city}
            price={property.price}
            currency={property.currency}
            location={property.location}
          />
          <PropertyStats
            bedrooms={property.bedrooms}
            cars={property.cars}
            sq={property.area}
            bathrooms={property.bathrooms}
          />

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Architectural Vision</h2>
            <p className="text-text-muted leading-relaxed">
              {property.description}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Prime Location</h2>
            <div className="rounded-2xl overflow-hidden h-64 bg-surface">
              {/* //? this well do later */}
              <PropertyMap lat={property.coordinates.lat} lng={property.coordinates.lng} />
            </div>
          </section>
        </div>

        {/* Right Section: Sidebar */}
        <div className="space-y-6">
          <ContactAgentForm agent={property.agent} />
          <PropertyInfoTable conciergeDetails={property.conciergeDetails} />
        </div>
      </div>
    </main>
  );
};
