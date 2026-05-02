export interface BooksListItem {
    id: string;
    created_at: string;
    rating: number;
    books: {
        title: string;
        author: string;
        description: string | null;
        category: string | null;
    };
}