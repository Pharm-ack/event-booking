import Image from "next/image";

export default function NavBar() {
  return (
    <nav className="px-4 backdrop-blur-[2px]">
      <div className="container px-4 py-3 flex items-center justify-between border border-[#197686] rounded-[24px] w-full max-w-[1200px] mx-auto my-0 ">
        <div className="flex items-center space-x-4">
          <Image width={92} height={36} src="/logo.svg" alt="logo" />
        </div>

        <div className="lg:flex items-center hidden  space-x-6">
          <a href="#" className="text-gray-300 hover:text-white">
            Events
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            My Tickets
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            About Project
          </a>
        </div>

        <button className="bg-white text-black px-4 py-3 lg:px-6 lg:py-4 rounded-[12px] hover:bg-gray-100">
          MY TICKETS →
        </button>
      </div>
    </nav>
  );
}
