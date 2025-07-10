import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { handle } = await params
   const client = await clientPromise
    const db = client.db("bittree")
    const collection = db.collection("links")

    // If the handle is already claimed, you can not create the linktree
    const item = await collection.findOne({handle:handle})
    if(!item){
      return notFound()
    }

  const item2 = {
    "_id": {
      "$oid": "686c22c2c885dd8d2065da18"
    },
    "links": [
      {
        "link": "https://www.facebook.com",
        "linktext": "facebook"
      }
    ],
    "handle": handle,
    "pic": "https://picsum.photos/200" // try with a valid static image first
  };

  return (
    <div className="flex min-h-screen bg-purple-400 justify-center items-start py-10">
      {item && <div className="photo flex flex-col justify-center items-center text-center gap-3">
        <img src={item.pic} alt={item.pic} className="mx-auto rounded-full w-32 h-32 object-cover" />
        <span className="font-bold text-xl block mt-2">@{item.handle}</span>
        <span className="description">{item.desc}</span>
        <div className="links w-full">
  {item.links.map((linkItem, index) => {
    const href = linkItem.link.startsWith("http")
      ? linkItem.link
      : `https://${linkItem.link}`;

    return (
      <a
        key={index}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block py-4 px-4 my-3 bg-purple-100 rounded-md shadow-lg transition-transform duration-150 hover:scale-105 hover:shadow-xl text-center"
      >
        {linkItem.linktext}
      </a>
    );
  })}
</div>


      </div>}
    </div>
  );
}
