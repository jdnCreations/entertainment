export type ThumbnailSizes = {
  small: string;
  medium?: string;
  large: string;
};

export type ThumbnailObject = {
  trending: ThumbnailSizes;
  regular: ThumbnailSizes;
};

export type MediaItem = {
  title: string;
  thumbnail: ThumbnailObject;
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
};
