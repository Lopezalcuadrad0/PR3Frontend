import { Handlers, PageProps } from "$fresh/server.ts";
import BookGrid from "../components/BookGrid.tsx";
import Button from "../components/Button.tsx";

interface Book {
  id: string;
  title: string;
  author: string;
  coverId?: number;
}

interface Data {
  results: Book[];
  query?: string;
}

export const handler: Handlers<Data> = {
  GET: async (req, ctx) => {
    const url = new URL(req.url);
    const query = url.searchParams.get("q")?.trim();

    if (!query) return ctx.render({ results: [] });

    const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    const results = data.docs.slice(0, 12).map((doc: any) => ({
      id: doc.key.replace("/works/", ""),
      title: doc.title,
      author: doc.author_name?.[0] ?? "Desconocido",
      coverId: doc.cover_i,
    }));

    return ctx.render({ results, query });
  },
};

export default function SearchPage({ data }: PageProps<Data>) {
  return (
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow fixed top-0 w-full z-10">
        <div class="max-w-4xl mx-auto px-4 py-4">
          <h1 class="text-2xl font-bold text-indigo-700">Open Library Explorer</h1>
        </div>
      </header>

      <main class="pt-24 p-4 max-w-4xl mx-auto">
        <form method="GET" class="flex gap-2 mb-6">
          <input
            name="q"
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
            placeholder="Título del libro"
            value={data.query ?? ""}
            required
          />
          <Button type="submit">Buscar</Button>
        </form>

        {data.query && (
          <div>
            <h2 class="text-xl font-semibold mb-4">Resultados para: <em>{data.query}</em></h2>
            {data.results.length > 0 ? (
              <BookGrid books={data.results} />
            ) : (
              <p class="text-red-600">No se encontraron libros con ese título.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}