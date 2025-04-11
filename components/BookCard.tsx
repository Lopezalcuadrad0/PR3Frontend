export default function BookCard({ title, author, coverId, id }) {
    const coverUrl = coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
      : "/default.jpg";
  
    return (
      <a href={`/book/${id}`} class="card">
        <img src={coverUrl} alt={title} class="cover" />
        <h3>{title}</h3>
        <p>{author}</p>
      </a>
    );
  }