import { getAllDocuments } from "../../../firebase/firestoreHelper";

const PROPERTIES_COLLECTION = "properties";

function normalizeTimestamp(timestamp) {
  if (!timestamp) {
    return null;
  }

  if (typeof timestamp.toDate === "function") {
    return timestamp.toDate().toISOString();
  }

  return timestamp;
}

function normalizeProperty(property) {
  const gallery =
    Array.isArray(property.images) && property.images.length > 0
      ? property.images
      : property.image
        ? [property.image]
        : [];

  return {
    id: property.id,
    title: property.title || "Untitled property",
    type: property.type || "Property",
    category: property.category || "standard",
    city: property.city || "",
    location: property.location || "",
    description: property.description || "",
    price: Number(property.price) || 0,
    bedrooms: Number(property.bedrooms) || 0,
    bathrooms: Number(property.bathrooms) || 0,
    area: Number(property.area) || 0,
    isFeatured: Boolean(property.isFeatured),
    image: property.image || gallery[0] || "",
    images: gallery,
    createdAt: normalizeTimestamp(property.createdAt),
  };
}

export async function getProperties() {
  try {
    const properties = await getAllDocuments(PROPERTIES_COLLECTION);
 
   

    const normalized = properties.map(normalizeProperty).sort((left, right) => {
      if (left.isFeatured !== right.isFeatured) {
        return Number(right.isFeatured) - Number(left.isFeatured);
      }

      return right.price - left.price;
    });

   
    return normalized;
  } catch (error) {
    console.error("[propertiesService] Error in getProperties:", error);
    throw error;
  }
}
