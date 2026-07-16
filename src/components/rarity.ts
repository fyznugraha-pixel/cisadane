export type Rarity = "common" | "rare" | "epic" | "legendary";

export interface RarityTheme {
  label: string;
  glow: string;
  ring: string;
  sparkle: string;
  particles: number;
  gems: number;
  frameGradient: [string, string, string];
}

/**
 * Dipetakan ke accentMap yang sudah ada di page.tsx (red/gold/teal/orange),
 * bukan warna neon generik. "legendary" = gold karena itu warna headliner
 * di festival ini (lihat FDB715 yang sudah dipakai di back-card lama).
 */
export const RARITY_THEMES: Record<Rarity, RarityTheme> = {
  common: {
    label: "Penampil",
    glow: "rgba(29,100,120,0.45)",     // teal
    ring: "#1D6478",
    sparkle: "#CFE8EE",
    particles: 6,
    gems: 1,
    frameGradient: ["#1D6478", "#FDFBF7", "#0F3A46"],
  },
  rare: {
    label: "Line-up",
    glow: "rgba(38,84,164,0.45)",      // biru utama situs
    ring: "#2654A4",
    sparkle: "#D6E4F7",
    particles: 8,
    gems: 2,
    frameGradient: ["#2654A4", "#FDFBF7", "#183a75"],
  },
  epic: {
    label: "Spesial",
    glow: "rgba(232,130,58,0.5)",      // orange
    ring: "#E8823A",
    sparkle: "#FBD9BC",
    particles: 10,
    gems: 3,
    frameGradient: ["#E8823A", "#FDFBF7", "#B85F22"],
  },
  legendary: {
    label: "Headliner",
    glow: "rgba(200,160,60,0.55)",     // gold
    ring: "#C8A03C",
    sparkle: "#F6E7BF",
    particles: 14,
    gems: 5,
    frameGradient: ["#C8A03C", "#FDFBF7", "#8a6c22"],
  },
};

/** Mystery/cover face — netral, biru+cream, konsisten dengan tema situs. */
export const UNKNOWN_THEME = {
  ring: "#2654A4",
  glow: "rgba(38,84,164,0.35)",
  frameGradient: ["#2654A4", "#FDFBF7", "#183a75"] as [string, string, string],
};