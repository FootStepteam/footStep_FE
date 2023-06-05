import { ReactComponent as GitHub } from '../../../assets/github-mark-white.svg';

const FooterLink = () => {
  return (
    <>
      <div className="flex justify-center mb-6 font-bold text-white">
        <a
          href="https://zero-base.co.kr/"
          target="_blank"
          className="mx-[1rem] w-14 text-[1.3rem]"
        >
          ZERO-BASE
        </a>
        <a
          href="https://github.com/FootStepteam"
          target="_blank"
          className="mx-[1rem]"
        >
          <GitHub />
        </a>
      </div>
    </>
  );
};

export default FooterLink;
