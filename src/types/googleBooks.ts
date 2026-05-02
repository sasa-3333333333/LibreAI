export interface GoogleBook {
  id: string;
  created_at: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    categories?: string[];
  };
}

export interface GoogleBooksResponse {
  items?: GoogleBook[];
}