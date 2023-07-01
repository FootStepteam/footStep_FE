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
    onSearch(query);
  };

  return (
    <div className="flex justify-center max-w-[800px] min-w-max w-2/3 my-4">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="검색어를 입력하세요"
        className="w-2/3 pl-4 py-2 border-y-[1px] border-l-[1px] border-gray-002 rounded-l-lg"
      />
      <button
        type="button"
        className="px-2 bg-platinum-002 border-y-[1px] border-r-[1px] border-gray-002 rounded-r-lg"
        onClick={handleSearch}
      >
        검색
      </button>
    </div>
  );
};

export default SearchBar;
