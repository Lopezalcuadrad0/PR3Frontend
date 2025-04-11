import { FunctionalComponent } from "preact";

interface Book {
  id: string;
  title: string;
  author: string;
  coverId?: number;
}

interface Props {
  books: Book[];
}

const BookGrid: FunctionalComponent<Props> = ({ books }) => {
  return (
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {books.map((book) => (
        <a
          href={`/book/${book.id}`}
          class="block bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden hover:scale-105 transform duration-200"
        >
          {book.coverId ? (
            <img
              src={`https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`}
              alt={book.title}
              class="w-full h-64 object-cover"
            />
          ) : (
            <div class="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
              Sin imagen
            </div>
          )}
          <div class="p-4">
            <h3 class="text-lg font-semibold">{book.title}</h3>
            <p class="text-gray-600">{book.author}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default BookGrid;
