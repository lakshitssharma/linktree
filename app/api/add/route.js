import clientPromise from "@/lib/mongodb";

export async function POST(request) {
    const body = await request.json()
    const client = await clientPromise
    const db = client.db("bittree")
    const collection = db.collection("links")

    // If the handle is already claimed, you can not create the linktree
    const doc = await collection.findOne({handle: body.handle})

    if (doc) {
        return Response.json({ success:false, message: 'This linkTree already exists!',error:true, result:null })
    }
    
   const result = await collection.insertOne(body)

    console.log(body);
  return Response.json({ success:true, message: 'Your linkTree Has been Generated!',error:false, result:result })
}