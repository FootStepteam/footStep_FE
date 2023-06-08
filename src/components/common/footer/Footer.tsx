import FooterLink from "./FooterLink";

const Footer = () => {
  return (
    <>
      <footer className="flex justify-center items-center w-full h-36 bg-main-color">
        <section className="flex flex-col justify-center items-center w-[40rem] h-32">
          <FooterLink />
          <p className="font-bold text-white">
            Copyright © Zerobase try-catch Team All Rights Reserved.{" "}
          </p>
        </section>
      </footer>
    </>
  );
};

export default Footer;
