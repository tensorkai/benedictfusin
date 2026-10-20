export interface PersonalUpdate {
  id: string;
  publishedAt: string;
  title: string;
  paragraphs: string[];
  image?: { src: string; alt: string; width: number; height: number };
}

// Add real updates here; use an ISO YYYY-MM-DD publication date.
export const personalUpdates: PersonalUpdate[] = [];
