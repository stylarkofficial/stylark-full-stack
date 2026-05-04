export type PreviewFit = "contain" | "cover";

export type Project = {
  title: string;
  category: string;
  summary: string;
  year: string;
  status: string;
  color: string;
  initials: string;
  url: string;
  previewImage: string;
  services?: string[];
  impact?: string;
  previewFit?: PreviewFit;
  previewPosition?: string;
  previewWidth?: number;
  previewHeight?: number;
};
