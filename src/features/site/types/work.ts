export type PreviewFit = "contain" | "cover";

export type Project = {
  title: string;
  category: string;
  year: string;
  status: string;
  color: string;
  initials: string;
  url: string;
  previewImage: string;
  previewFit?: PreviewFit;
  previewPosition?: string;
};
