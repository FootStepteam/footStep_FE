import { useEffect, useState } from "react";

const Map = () => {
  const [kakaoMap, setKakaoMap] = useState();

  const zoomIn = () => {
    const level = kakaoMap.getLevel();
    kakaoMap.setLevel(level - 1);
  };

  const zoomOut = () => {
    const level = kakaoMap.getLevel();
    kakaoMap.setLevel(level + 1);
  };

  useEffect(() => {
    const container = document.getElementById("map");
    // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      // 지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
    console.log(map);
    setKakaoMap(map);
  }, []);

  return (
    <div id="map" className="relative w-[100vw] h-[100vh] z-[9000]">
      <div className="flex flex-col absolute top-20 right-4 w-12 h-24 bg-white outline-none rounded-lg shadow-lg z-[9999]">
        <button
          type="button"
          className="grow border-b border-b-gray font-bold text-xl"
          onClick={zoomIn}
        >
          +
        </button>
        <button
          type="button"
          className="grow font-bold text-xl"
          onClick={zoomOut}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default Map;
