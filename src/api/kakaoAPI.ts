export const createMap = () => {
  const mapContainer = document.getElementById("map"); // 지도를 표시할 div
  const mapOption = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
  };
  const map = new kakao.maps.Map(mapContainer, mapOption);
};

export const ps = new kakao.maps.services.Places();

export const placeSearch = (keyword: string, setSearchPlaceResult: any) => {
  ps.keywordSearch(keyword, (data, status, pagination) => {
    console.log(data);
    setSearchPlaceResult(data);
  });
};
