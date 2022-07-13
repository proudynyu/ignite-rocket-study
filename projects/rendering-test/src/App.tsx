import { useState } from "react";

import { SearchResult } from "./components/SearchResult";

interface ResultsProps {
  id: number;
  productName: string;
  price: number;
}

function App() {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState([] as ResultsProps[]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    setResults(data);
  }

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <SearchResult products={results} />
    </div>
  );
}

export default App;
