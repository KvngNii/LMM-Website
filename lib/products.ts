export type Product = {
  id: string;
  title: string;
  author: string;
  blurb: string;
  price: number; // USD
  placeholder?: boolean;
};

// TODO(LMM): replace these sample listings with the real books, prices and cover images.
export const products: Product[] = [
  {
    id: "book-1",
    title: "Book title one",
    author: "Author name",
    blurb: "A short line about what this book gives the reader.",
    price: 25,
    placeholder: true,
  },
  {
    id: "book-2",
    title: "Book title two",
    author: "Author name",
    blurb: "A short line about what this book gives the reader.",
    price: 30,
    placeholder: true,
  },
  {
    id: "book-3",
    title: "Book title three",
    author: "Author name",
    blurb: "A short line about what this book gives the reader.",
    price: 20,
    placeholder: true,
  },
];
