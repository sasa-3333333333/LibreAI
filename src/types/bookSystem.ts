import type { GoogleBook } from "./googleBooks";
import type { BooksListItem } from "./BooksListItem";

export interface BookSearchSectionProps {
    searchResults: GoogleBook[];
    loading: boolean;
    searchBooks: (query: string) => Promise<void>;
    registerBook: (book: GoogleBook) => Promise<void>;
}

export interface BooksListSectionProps {
    books: BooksListItem[];
    loading: boolean;
    updateRating: (userId: string, newRating: number) => Promise<void>;
    handleDelete: (id: string | undefined, title: string) => Promise<void>;
    refresh: () => Promise<void>;
}