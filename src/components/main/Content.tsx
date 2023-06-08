import travelImg from "../../assets/travel.jpg";
import communityImg from "../../assets/crowd.jpg";
import Banner from "./Banner";

const Content = () => {
  const banners = [
    {
      type: "travel",
      imgSrc: travelImg,
      path: "/",
      animation: "animate-intro",
      text: {
        bannerTitle: "친구들과 함께하는 여행 일정 플랫폼 발자국",
        bannerDescription: "지금 여행 일정을 계획해보세요.",
      },
      linkText: "시작하기",
      fontColor: "black",
    },
    {
      type: "community",
      imgSrc: communityImg,
      path: "/",
      animation: "animate-intro",
      text: {
        bannerTitle: "어디로 떠나야할지 고민이 되시나요?",
        bannerDescription:
          "지금 커뮤니티에서 공개된 일정을 통해 고민을 해결하세요 !",
      },
      linkText: "커뮤니티",
      fontColor: "white",
    },
  ];

  return (
    <>
      <div className="w-full">
        {banners.map((banner, index) => (
          <Banner
            key={banner.type}
            type={banner.type}
            imgSrc={banner.imgSrc}
            path={banner.path}
            animation={banner.animation}
            text={banner.text}
            linkText={banner.linkText}
            fontColor={banner.fontColor}
            index={index}
          />
        ))}
      </div>
    </>
  );
};

export default Content;
