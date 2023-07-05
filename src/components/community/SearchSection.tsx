import SearchBar from "./SearchBar";
import SortButtons from "./SortButtons";

const SearchSection = () => {
  return (
    <div className="flex flex justify-center items-center h-44 bg-sky-005">
      <SearchBar />
      <SortButtons />
    </div>
  );
};

export default SearchSection;
