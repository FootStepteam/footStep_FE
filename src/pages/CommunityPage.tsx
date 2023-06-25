import { useState } from "react";
import SearchBar from "../components/community/SearchBar";
import Lists from "../components/community/Lists";
import HeaderContainer from "../components/common/header/HeaderContainer";
import Footer from "../components/common/footer/Footer";

const CommunityPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <HeaderContainer />
      <div className="flex flex-col justify-center items-center h-44 bg-main-color">
        <SearchBar onSearch={handleSearch} />
      </div>
      <Lists searchQuery={searchQuery} />
      <Footer />
    </div>
  );
};

export default CommunityPage;
