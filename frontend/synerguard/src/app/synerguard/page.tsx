import Image from "next/image";
import Navbar from "../components/Navbar";

export default function Home() {
  const navbarHeight = "70px";

  return (
    <>
      <Navbar />
      <main className="flex w-full flex-col" style={{ backgroundColor: "rgb(238, 240, 241)", minHeight: `calc(100vh - ${navbarHeight})`, padding: "24px", overflow: "hidden" }}>
        <div className="flex w-full flex-1 justify-center gap-x-4">
          <div className="bg-white rounded-lg p-4 w-1/2 flex-1 border border-gray-300">
            boo
          </div>
          <div className="bg-white rounded-lg p-4 w-1/2 flex flex-col border border-gray-300" style={{ minHeight: `calc(100vh - ${navbarHeight} - 48px)` }}>
            <div className="bg-white rounded-lg p-4 flex-grow border border-gray-300 mb-4" style={{ overflowY: 'auto' }}>
              Top half
            </div>
            <div className="bg-white rounded-lg p-4 flex-grow border border-gray-300" style={{ overflowY: 'auto' }}>
              Bottom half
            </div>
          </div>
        </div>
      </main>
    </>
  );
}