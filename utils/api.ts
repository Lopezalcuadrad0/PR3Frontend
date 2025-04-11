export async function fetchBookByTitle(title: string) {
    const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(title)}`);
    const data = await res.json();
    return data.docs[0];
  }