import Image from "next/image";
import Link from "next/link";

const NavBar = ({ setShowSettings, setStep }: any) => {
  return (
    <nav className="bg-[#A8A4A4] border-gray-200 dark:bg-[#595555] flex-1 w-full">
      <div className="flex flex-wrap items-center justify-between p-4 flex-1">
        <button
          onClick={() =>
            setStep((prevStep: any) => (prevStep > 1 ? prevStep - 1 : prevStep))
          }
        >
          <img
            src="/backButton.png"
            alt="backButton"
            width="60px"
            height="60px"
          />
        </button>
        <Link href="/" className="flex items-center self-start">
          <img src="/LogoHowToGym.png" alt="HowToGym" width={196} height={70} />
        </Link>
        <button
          className="rounded-full bg-[#E2DADA] px-5 py-2"
          onClick={() => setShowSettings((prevValue: any) => !prevValue)}
        >
          <img
            src="/configIcon.png"
            alt="configIcon"
            width="30px"
            height="30px"
          />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
