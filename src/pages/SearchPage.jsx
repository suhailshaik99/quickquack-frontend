import SearchBar from "../features/Search/SearchBar";

function SearchPage() {
  return (
    <section className="flex w-full flex-col gap-5 px-5 pt-5 pb-2">
      <header className="text-5xl sm:text-6xl font-bold">
        <h1>Explore your search</h1>
      </header>
      <SearchBar />
    </section>
  );
}

export default SearchPage;