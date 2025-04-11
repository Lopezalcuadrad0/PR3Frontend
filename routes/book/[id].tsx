import { Handlers, PageProps } from "$fresh/server.ts";

type BookData = {
  title: string;
  description?: string | { value: string };
  created?: { value: string };
  first_publish_date?: string;
  covers?: number[];
  authors?: { author: { key: string } }[];
};

type AuthorData = {
  name: string;
  key: string;
};

type Data = {
  book: BookData;
  author?: AuthorData;
};

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const { id } = ctx.params;
    const res = await fetch(`https://openlibrary.org/works/${id}.json`);
    const book = await res.json();

    let author;

    if (book.authors?.[0]?.author?.key) {
      const authorId = book.authors[0].author.key;
      const authorRes = await fetch(`https://openlibrary.org${authorId}.json`);
      author = await authorRes.json();
    }

    return ctx.render({ book, author });
  },
};

export default function BookPage({ data }: PageProps<Data>) {
  const book = data.book;
  const author = data.author;
  const description = typeof book.description === "string"
    ? book.description
    : book.description?.value ?? "Sin descripción.";

  const date =
    book.first_publish_date ?? book.created?.value?.substring(0, 10) ??
    "Fecha desconocida";

  const coverId = book.covers?.[0];
  const authorId = book.authors?.[0]?.author?.key.replace("/authors/", "");

  return (
    <div class="p-4 max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold mb-2">{book.title}</h1>

      {coverId && (
        <img
          src={`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`}
          alt={book.title}
          class="mb-4 rounded"
        />
      )}

      <p class="mb-2"><strong>Descripción:</strong> {description}</p>
      <p class="mb-2"><strong>Año de publicación:</strong> {date}</p>
      {author && authorId && (
        <p class="mb-2">
          <strong>Autor:</strong>{" "}
          <a
            class="text-blue-600 hover:underline"
            href={`/author/${authorId}`}
          >
            {author.name}
          </a>
        </p>
      )}
    </div>
  );
}