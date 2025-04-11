import { Handlers, PageProps } from "$fresh/server.ts";
import BookCard from "../../components/BookCard.tsx";

export const handler: Handlers = {
  async GET(_, ctx) {
    const { id } = ctx.params;

    const [authorRes, worksRes] = await Promise.all([
      fetch(`https://openlibrary.org/authors/${id}.json`),
      fetch(`https://openlibrary.org/authors/${id}/works.json`),
    ]);

    const author = await authorRes.json();
    const works = await worksRes.json();

    const books = works.entries.slice(0, 6).map((work: any) => ({
      title: work.title,
      author: author.name,
      coverId: work.covers?.[0],
      id: work.key.replace("/works/", "")
    }));

    return ctx.render({
      name: author.name,
      bio: author.bio?.value ?? author.bio ?? "Sin biografía",
      books,
    });
  },
};

export default function AuthorPage({ data }: PageProps) {
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.bio}</p>
      <div class="grid">
        {data.books.map((book) => <BookCard {...book} />)}
      </div>
    </div>
  );
}
