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
  id: number;
  title: string;
  year: number;
  category: string;
  rating: string;
  isTrending: boolean;
  thumbnailTrendingSmall: string | null;
  thumbnailTrendingLarge: string | null;
  thumbnailRegularSmall: string;
  thumbnailRegularMedium: string;
  thumbnailRegularLarge: string;
};

export type Category = "Movie" | "TV Series";
