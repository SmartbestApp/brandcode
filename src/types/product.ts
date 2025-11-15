export type Product = {
  title: string;
  id: number;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};
