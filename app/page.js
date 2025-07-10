"use client"
 import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()
  const [text, setText] = useState("")


  const createTree = () => {
    router.push(`/generate?handle=${text}`)
  }


  return (
    <main>
      <section className="bg-[#254F1A] min-h-[100vh] grid grid-cols-2 pt-35">
        <div className=" flex  justify-center flex-col ml-[5vw] gap-1">
          <p className="text-[#D2E823] font-extrabold text-7xl">Everything you</p>
          <p className="text-[#D2E823] font-extrabold text-7xl"> are. In one,</p>
          <p className="text-[#D2E823] font-extrabold text-7xl">simple link in bio.</p>
          <p className="text-white font-semibold text-[20px] my-4">Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
          <div className="input flex gap-2">
            <input value={text} onChange={(e) => setText(e.target.value)} className="bg-white px-2 py-2 focus:outline-green-700 rounded-md" type="text" placeholder="Enter Your Handle" />
            <button
              onClick={() => createTree()}
              className="bg-[#E9C0E9] rounded-full px-4 py-4 font-bold transition-transform duration-150 hover:scale-105"
            >
              Claim your LinkTree
            </button>


          </div>
        </div>
        <div className=" flex items-center justify-center flex-col mr-[5vw]">
          <Image className="h-150" src="home2.png" alt="hompage img" />
        </div>
      </section>
      <section className="bg-red-400 min-h-[100vh]">
        <Image className="h-full w-fit" src="links.png" alt="links" />
      </section>
    </main>
  );
}
