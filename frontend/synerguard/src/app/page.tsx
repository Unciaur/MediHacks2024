import Image from "next/image";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center p-24" style={{ backgroundColor: "rgb(238, 240, 241)" }}>
        <div className="flex w-full justify-center">
          <div className="bg-white rounded-lg p-4 w-1/2">
            boo
          </div>
          <div className="bg-white rounded-lg p-4 w-1/2">
            test
          </div>
        </div>
      </main>
    </>
  );
}