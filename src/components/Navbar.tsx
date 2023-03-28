import Image from "next/image";
import Logo from "../../public/logo.svg";

export default function Navbar() {
  return (
    <nav className="bg-white flex flex-wrap px-8 py-2 justify-between border-b-[1px]">
      <div className="h-12 flex items-center justify-center">
        <Image src={Logo} width={156} alt="logo" priority />
      </div>
      <form action="/" className="flex relative">
        <input
          type="search"
          name="serach"
          id="search"
          className="w-[360px] h-12 rounded-full border-[1px] px-12"
          placeholder="Search name, genre, and others..."
        />
        <div className="w-12 h-12 flex items-center justify-center absolute">
          <i className="fa-light fa-magnifying-glass"></i>
        </div>
      </form>
      <div className="flex gap-2">
        <div className="w-12 h-12 flex items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded-xl">
          <i className="fa-light fa-cog"></i>
        </div>
        <div className="w-12 h-12 flex items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded-xl">
          <i className="fa-light fa-moon"></i>
        </div>
      </div>
    </nav>
  );
}
