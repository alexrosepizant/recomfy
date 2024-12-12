export interface OpenLibraryWork {
  key: string;
  title: string;
  description?: {
    value: string;
    type?: string;
  } | string;
  covers?: number[];
  first_publish_date?: string;
  subjects?: string[];
  ratings_average?: number;
}

export interface OpenLibraryAuthor {
  key: string;
  name: string;
}

export interface OpenLibrarySearchResult {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  subject?: string[];
}

export interface OpenLibrarySearchResponse {
  numFound: number;
  start: number;
  docs: OpenLibrarySearchResult[];
}