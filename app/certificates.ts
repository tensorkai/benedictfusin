export type Certificate = {
  id: string;
  title: string;
  placement: "toolkit" | "activity" | "milestones" | "personal";
  placeholder: boolean;
  preview: string;
  documentUrl?: string;
};

// Replace preview and documentUrl with original assets when available.
export const certificates: Certificate[] = [
  { id: "learning", title: "Learning archive", placement: "toolkit", placeholder: true, preview: "/certificate-placeholder.svg" },
  { id: "practice", title: "Practice archive", placement: "activity", placeholder: true, preview: "/certificate-placeholder.svg" },
  { id: "milestones", title: "Milestone archive", placement: "milestones", placeholder: true, preview: "/certificate-placeholder.svg" },
  { id: "personal", title: "Personal archive", placement: "personal", placeholder: true, preview: "/certificate-placeholder.svg" },
];
