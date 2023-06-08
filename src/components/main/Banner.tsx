import { Link } from "react-router-dom";

interface IBannerProps {
  type: string;
  imgSrc: string;
  path: string;
  animation: string;
  text: {
    bannerTitle: string;
    bannerDescription: string;
  };
  linkText: string;
  fontColor: string;
  index: number;
}

const Banner = (props: IBannerProps) => {
  return (
    <>
      <div className="flex w-full h-banner">
        <div className="flex w-[70rem] h-banner">
          <img
            className="object-cover"
            src={props.imgSrc}
            alt=""
            width={1920}
          />
        </div>
        <div className={`w-[calc(100%-70rem)] bg-white`}>
          <div
            className={`relative top-[16rem] left-[5rem] w-[37rem] text-black ${props.animation}`}
          >
            <p className="mb-[1rem] font-bold text-[2rem]">
              {props.text.bannerTitle}
            </p>
            <p className="text-[#A5A5A5] text-[1.2rem]">
              {props.text.bannerDescription}
            </p>
            <Link
              to={props.path}
              className="block mt-6 px-6 py-4 w-[7.5rem] rounded-xl bg-main-color hover:bg-hover-color font-bold text-white text-[1.2rem] cursor-pointer animate-introBtn"
            >
              {props.linkText}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
