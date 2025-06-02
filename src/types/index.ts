// Animal Types
export type AnimalType = "dana" | "koç" | "kuzu" | "keçi" | "deve";

export interface AnimalAnalysis {
  id: string;
  imageUrl: string;
  animalType: AnimalType;
  breed?: string;
  estimatedWeight: number;
  healthScore: number;
  marketValue: number;
  meatYield: {
    totalMeat: number;
    bonelessMeat: number;
    boneWeight: number;
  };
  costPerShare: number;
  analysisDate: Date;
  confidence: number;
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  subscription: "free" | "premium";
}

// Analysis Request
export interface AnalysisRequest {
  imageFile: File;
  userId?: string;
  analysisType: "basic" | "detailed";
}

// Market Data
export interface MarketData {
  animalType: AnimalType;
  pricePerKg: number;
  regionAveragePrices: {
    min: number;
    max: number;
    average: number;
  };
  lastUpdated: Date;
}

// Comparison
export interface AnimalComparison {
  animals: AnimalAnalysis[];
  bestValue: string; // animal id
  recommendations: string[];
}

// Favorites
export interface FavoriteAnimal {
  id: string;
  userId: string;
  animalAnalysis: AnimalAnalysis;
  notes?: string;
  addedAt: Date;
}
