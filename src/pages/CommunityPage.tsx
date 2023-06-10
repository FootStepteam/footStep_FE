import { useState } from "react";
import SearchBar from "../components/community/SearchBar";
import Category from "../components/community/Category";
import Lists from "../components/community/Lists";
import HeaderContainer from "../components/common/header/HeaderContainer";
import Footer from "../components/common/footer/Footer";

const CommunityPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <HeaderContainer />
      <div className="flex flex-col justify-center items-center h-44 bg-main-color">
        <SearchBar onSearch={handleSearch} />
        <Category
          onSelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
      </div>
      <Lists searchQuery={searchQuery} selectedCategory={selectedCategory} />
      <Footer />
    </div>
  );
};

export default CommunityPage;
