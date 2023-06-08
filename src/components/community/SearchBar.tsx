import React, { useState } from "react";

interface SearchBarProps {
  // onSearch: (query: string) => void;
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query);
    }
  };

  return (
    <div className="flex justify-center w-1/2 my-4">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="검색어를 입력하세요"
        className="w-2/3 pl-4 py-2 rounded-l-lg"
      />
      <button
        type="button"
        className="px-2 bg-white-color border-l-2 rounded-r-lg"
        onClick={handleSearch}
        disabled={query.trim() === ""}
      >
        검색
      </button>
    </div>
  );
};

export default SearchBar;
