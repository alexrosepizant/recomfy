export interface GoogleBooksVolume {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    publishedDate?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    averageRating?: number;
    categories?: string[];
  };
}

export interface GoogleBooksResponse {
  items?: GoogleBooksVolume[];
  totalItems: number;
}