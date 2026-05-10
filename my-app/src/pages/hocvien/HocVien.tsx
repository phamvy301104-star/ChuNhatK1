import { useState } from "react";

interface PopularCollection {
  name: string;
  totalImages: string;
  primaryImage: string;
  descriptionImage: string[];
  category: string;
}

const allCollections: PopularCollection[] = [
  {
    name: "People",
    totalImages: "144",
    primaryImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    descriptionImage: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1507009957411-b054a24ef986?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    ],
    category: "Profile",
  },
  {
    name: "Nature",
    totalImages: "7K",
    primaryImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    descriptionImage: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1470252649378-9c29740ff023?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=100&h=100&fit=crop",
    ],
    category: "Relaxing",
  },
  {
    name: "History",
    totalImages: "431",
    primaryImage: "https://images.unsplash.com/photo-1523821741446-edb429f67505?w=800&h=400&fit=crop",
    descriptionImage: [
      "https://images.unsplash.com/photo-1507842217343-583f20270319?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=100&h=100&fit=crop",
    ],
    category: "Person",
  },
  {
    name: "New York City",
    totalImages: "892",
    primaryImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=400&fit=crop",
    descriptionImage: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1513581981614-7c12428cce8e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop",
    ],
    category: "New York",
  },
  {
    name: "Fashion Style",
    totalImages: "556",
    primaryImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=400&fit=crop",
    descriptionImage: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=100&h=100&fit=crop",
    ],
    category: "Fashion",
  },
];

const categories = ["Profile", "New York", "Relaxing", "Person", "Fashion"];

function PopularCollectionCard({ collection }: { collection: PopularCollection }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
      <img
        src={collection.primaryImage}
        alt={collection.name}
        className="w-full h-64 object-cover rounded-3xl mb-4"
      />
      <div className="flex gap-3 mb-4">
        {collection.descriptionImage.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${collection.name} ${idx}`}
            className="w-24 h-24 object-cover rounded-2xl"
          />
        ))}
      </div>
      <h3 className="font-bold text-lg mb-2">{collection.name}</h3>
      <p className="text-gray-600">📷 {collection.totalImages}</p>
    </div>
  );
}

function PopularCollectionsGrid({ selectedCategory }: { selectedCategory: string }) {
  const filteredCollections = allCollections.filter(
    (collection) => collection.category === selectedCategory
  );

  return (
    <div className="grid grid-cols-3 gap-8 mt-8">
      {filteredCollections.map((collection) => (
        <PopularCollectionCard key={collection.name} collection={collection} />
      ))}
    </div>
  );
}

function Header({ onCategoryChange }: { onCategoryChange: (category: string) => void }) {
  const [activeCategory, setActiveCategory] = useState("Profile");

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-6">Popular Collections</h1>
      <div className="flex gap-8 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeCategory === category
                ? "bg-blue-500 text-white shadow-md"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function HocVien() {
  const [selectedCategory, setSelectedCategory] = useState("Profile");

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Header onCategoryChange={setSelectedCategory} />
        <PopularCollectionsGrid selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}
