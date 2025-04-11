import { Handlers, PageProps } from "$fresh/server.ts";
import BookCard from "../components/BookCard.tsx";
import { fetchBookByTitle } from "../utils/api.ts";
import Button from "../components/Button.tsx";

const featuredBooks = [
  "To Kill a Mockingbird", "1984", "The Great Gatsby", "Pride and Prejudice",
  "The Hobbit", "Moby-Dick", "Jane Eyre", "War and Peace",
  "The Catcher in the Rye", "Brave New World", "The Lord of the Rings",
  "Crime and Punishment", "The Alchemist", "The Picture of Dorian Gray",
  "Harry Potter and the Sorcerer's Stone"
];

export const handler: Handlers = {
  async GET(_, ctx) {
    const results = await Promise.all(
      featuredBooks.map(async (title) => {
        const data = await fetchBookByTitle(title);
        return {
          title: data.title,
          author: data.author_name?.[0] ?? "Desconocido",
          coverId: data.cover_i,
          id: data.key.replace("/works/", ""),
        };
      })
    );

    return ctx.render(results);
  },
};

export default function Home({ data }: PageProps) {
  return (
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow fixed top-0 w-full z-10">
        <div class="max-w-4xl mx-auto px-4 py-4">
          <h1 class="text-2xl font-bold text-indigo-700">Open Library Explorer</h1>
        </div>
      </header>

      <main class="pt-24 p-4 max-w-4xl mx-auto text-center">
        <a href="/search">
          <Button>Buscar más libros</Button>
        </a>
        <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.map((book) => (
            <BookCard {...book} />
          ))}
        </div>
      </main>
    </div>
  );
}
