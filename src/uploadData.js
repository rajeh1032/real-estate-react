import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase/firebaseConfig";

const properties = [
  {
    title: "Affordable Apartment in Shubra",
    description: "Budget-friendly apartment",
    price: 300000,
    city: "Cairo",
    location: "Shubra",
    type: "Apartment",
    category: "budget",
    bedrooms: 2,
    bathrooms: 1,
    area: 90,
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6",
    images: ["https://images.unsplash.com/photo-1523217582562-09d0def993a6"],
    isFeatured: false,
    createdAt: Timestamp.now()
  },
  {
    title: "Cozy Apartment Heliopolis",
    description: "Small cozy place",
    price: 450000,
    city: "Cairo",
    location: "Heliopolis",
    type: "Apartment",
    category: "budget",
    bedrooms: 2,
    bathrooms: 1,
    area: 100,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"],
    isFeatured: false,
    createdAt: Timestamp.now()
  },

  {
    title: "Modern Apartment Nasr City",
    description: "Perfect for families",
    price: 900000,
    city: "Cairo",
    location: "Nasr City",
    type: "Apartment",
    category: "standard",
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be"],
    isFeatured: false,
    createdAt: Timestamp.now()
  },
  {
    title: "Beach Apartment Alex",
    description: "Sea view apartment",
    price: 1100000,
    city: "Alexandria",
    location: "Gleem",
    type: "Apartment",
    category: "standard",
    bedrooms: 3,
    bathrooms: 2,
    area: 170,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"],
    isFeatured: true,
    createdAt: Timestamp.now()
  },

  {
    title: "Premium Apartment New Cairo",
    description: "High-end modern apartment",
    price: 1500000,
    city: "Cairo",
    location: "New Cairo",
    type: "Apartment",
    category: "premium",
    bedrooms: 3,
    bathrooms: 2,
    area: 200,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"],
    isFeatured: true,
    createdAt: Timestamp.now()
  },
  {
    title: "Modern Duplex October",
    description: "Duplex with open design",
    price: 1800000,
    city: "Giza",
    location: "6th October",
    type: "Duplex",
    category: "premium",
    bedrooms: 4,
    bathrooms: 3,
    area: 260,
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
    images: ["https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde"],
    isFeatured: true,
    createdAt: Timestamp.now()
  },

  {
    title: "Luxury Villa Sheikh Zayed",
    description: "Villa with pool and garden",
    price: 4000000,
    city: "Cairo",
    location: "Sheikh Zayed",
    type: "Villa",
    category: "luxury",
    bedrooms: 6,
    bathrooms: 5,
    area: 500,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c"],
    isFeatured: true,
    createdAt: Timestamp.now()
  },
  {
    title: "Luxury Penthouse New Cairo",
    description: "Penthouse with skyline view",
    price: 5000000,
    city: "Cairo",
    location: "New Cairo",
    type: "Penthouse",
    category: "luxury",
    bedrooms: 5,
    bathrooms: 4,
    area: 350,
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
    images: ["https://images.unsplash.com/photo-1507089947368-19c1da9775ae"],
    isFeatured: true,
    createdAt: Timestamp.now()
  }
];

export const uploadData = async () => {
  try {
    for (let property of properties) {
      await addDoc(collection(db, "properties"), property);
    }
    console.log("🔥 Data uploaded successfully");
  } catch (error) {
    console.error("Error ❌", error);
  }
};