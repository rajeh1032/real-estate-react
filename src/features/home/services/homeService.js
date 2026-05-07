import { getProperties } from "../../properties/services/propertiesService";

const homePageContent = {
  hero: {
    title: ["Architecture", "Meets Ambition."],
    description:
      "Discover the world's most evocative living spaces. Our editorial selection prioritizes high-end design, sustainable luxury, and architectural permanence.",
    searchPlaceholder: "Search by city or architectural style...",
    image: "/assets/home/hero-house.png",
  },
  newsletter: {
    title: "Join the Inner Circle of Architectural Excellence",
    description:
      "Receive our weekly curated journal on modern heritage properties and market insights before they hit the public list.",
    inputPlaceholder: "Your email address",
    image: "/assets/home/newsletter-pattern.png",
  },
};

export function getHomePageContent() {
  return homePageContent;
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function mapPropertyToHomeCard(property, index) {
  const fallbackBadges = [
    { label: "New Arrival", tone: "default" },
    null,
    { label: "Editor's Choice", tone: "accent" },
  ];

  const fallbackBadge = fallbackBadges[index] || null;
  const location = [property.location, property.city]
    .filter(Boolean)
    .join(", ");

  return {
    id: property.id,
    title: property.title,
    location: location || "Location unavailable",
    price: formatPrice(property.price),
    image: property.image || "/assets/home/hero-house.png",
    badge: property.isFeatured ? fallbackBadge?.label || "Featured" : null,
    badgeTone: fallbackBadge?.tone || "default",
    searchText: [
      property.title,
      property.location,
      property.city,
      property.type,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase(),
    stats: [
      { label: `${property.bedrooms} Beds`, icon: "bed" },
      { label: `${property.bathrooms} Baths`, icon: "bath" },
      { label: `${property.area.toLocaleString("en-US")} sq ft`, icon: "area" },
    ],
  };
}

export async function getHomeFeaturedProperties() {
  try {
    const properties = await getProperties();

    const featured = properties.slice(0, 3);

    const mapped = featured.map(mapPropertyToHomeCard);

    return mapped;
  } catch (error) {
   
    throw error;
  }
}
